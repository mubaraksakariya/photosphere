# Generated by Django 4.2.2 on 2023-06-22 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0004_customuser_bio_customuser_is_blocked_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_veryfied',
            field=models.BooleanField(default=False),
        ),
    ]
