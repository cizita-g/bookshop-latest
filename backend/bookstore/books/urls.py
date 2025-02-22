from django.urls import path
from .views import register, login_view, logout_view, get_books, get_book, create_checkout_session

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("books/", get_books, name="get_books"),
    path("books/<int:book_id>/", get_book, name="get_book"),
    path("create-checkout-session/", create_checkout_session, name="create_checkout_session"),  # ✅ New Route
]
