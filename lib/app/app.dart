import 'package:flutter/material.dart';

import 'routes.dart';
import 'theme.dart';

class ConectaLarApp extends StatelessWidget {
  const ConectaLarApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ConectaLar',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      initialRoute: AppRoutes.home,
      routes: AppRoutes.routes,
    );
  }
}
