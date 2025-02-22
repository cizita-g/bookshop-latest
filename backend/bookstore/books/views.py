import stripe
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
import json
from .models import Book


# ✅ Set Stripe Secret Key
stripe.api_key = "sk_test_51QvJdGR7BATBYbryrRPaV5kViqgOdwq9jSNLrYA7egqZJJA4QMFd3dIg0N1eclzkUYgVtiBtw6XmBY1s7SV9FYEj005qTK2sXs"  

@csrf_exempt
def create_checkout_session(request):
    if request.method == "POST":
        try:
            # ✅ Log the request data
            data = json.loads(request.body)
            print("🔍 Received Data:", data)  # Debugging log

            if "cart" not in data:
                return JsonResponse({"error": "Cart data is missing"}, status=400)

            line_items = []
            for item in data["cart"]:
                if not all(k in item for k in ["title", "original_price", "sale_price", "is_on_sale", "quantity"]):
                    return JsonResponse({"error": "Invalid cart data format"}, status=400)

                price = item["sale_price"] if item["is_on_sale"] else item["original_price"]
                line_items.append({
                    "price_data": {
                        "currency": "usd",  # Change to your currency if needed
                        "product_data": {
                            "name": item["title"],
                        },
                        "unit_amount": int(price * 100),  # Stripe requires amount in cents
                    },
                    "quantity": item["quantity"],
                })

            if not line_items:
                return JsonResponse({"error": "No valid items in cart"}, status=400)

            checkout_session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=line_items,
                mode="payment",
                success_url="http://localhost:3000/payment-success",
                cancel_url="http://localhost:3000/cart",
            )

            print("✅ Stripe Checkout Session Created:", checkout_session.id)  # Debugging log
            return JsonResponse({"id": checkout_session.id})
        except Exception as e:
            print("❌ Stripe Error:", str(e))  # Debugging log
            return JsonResponse({"error": str(e)}, status=500)


# ✅ Register New User
@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')

            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)

            user = User.objects.create_user(username=username, email=email, password=password)
            return JsonResponse({'message': 'User registered successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

# ✅ Login User (with Session)
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                request.session['user_id'] = user.id
                return JsonResponse({'message': 'Login successful', 'user': user.username}, status=200)
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

# ✅ Logout User
@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'}, status=200)

# ✅ Get CSRF Token
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

# ✅ Fetch All Books
def get_books(request):
    books = list(Book.objects.values())
    return JsonResponse(books, safe=False)

# ✅ Fetch Single Book Details
def get_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return JsonResponse({
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "categories": book.categories,
        "description": book.description,
        "original_price": book.original_price,
        "is_on_sale": book.is_on_sale,
        "sale_price": book.sale_price,
        "rating": book.rating,
        "cover_image": request.build_absolute_uri(book.cover_image.url) if book.cover_image else None,
    })
