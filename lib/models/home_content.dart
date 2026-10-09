import 'categoria.dart';
import 'profissional.dart';

class HomeContent {
  const HomeContent({
    this.categories = const [],
    this.featuredProfessionals = const [],
  });

  final List<Categoria> categories;
  final List<Profissional> featuredProfessionals;
}
