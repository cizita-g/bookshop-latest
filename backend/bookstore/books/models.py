from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    categories = models.JSONField()  # Storing categories as an array
    description = models.TextField()
    original_price = models.IntegerField()
    is_on_sale = models.BooleanField(default=False)
    sale_price = models.IntegerField(null=True, blank=True)
    rating = models.FloatField(default=0, blank=True)
    cover_image = models.ImageField(upload_to='book_covers/')

    def __str__(self):
        return self.title
