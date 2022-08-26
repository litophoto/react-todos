from rest_framework import viewsets

from .serializers import Todo, TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.order_by('-created_at')
    serializer_class = TodoSerializer