# Generated by Django 4.2.2 on 2023-06-27 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0006_rename_is_veryfied_customuser_is_verified'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='otp',
            field=models.CharField(blank=True, default='', max_length=6),
        ),
    ]
