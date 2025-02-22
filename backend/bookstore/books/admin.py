from django.contrib import admin
from .models import Book

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'original_price', 'is_on_sale', 'sale_price', 'rating')
    list_filter = ('is_on_sale', 'categories')
    search_fields = ('title', 'author')
