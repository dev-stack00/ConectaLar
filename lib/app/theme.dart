import 'package:flutter/material.dart';

abstract final class AppColors {
  static const verde = Color(0xFF237A57);
  static const verdeEscuro = Color(0xFF15553B);
  static const verdeClaro = Color(0xFFE8F3ED);
  static const branco = Color(0xFFFFFFFF);
  static const fundo = Color(0xFFF5F9F6);
  static const texto = Color(0xFF153B31);
  static const textoSuave = Color(0xFF7D8985);
  static const estrela = Color(0xFFFFC107);
}

abstract final class AppTheme {
  static final light = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.verde,
      primary: AppColors.verde,
      secondary: AppColors.verdeEscuro,
      surface: AppColors.branco,
    ),
    scaffoldBackgroundColor: AppColors.fundo,
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.branco,
      foregroundColor: AppColors.texto,
      centerTitle: false,
      elevation: 0,
    ),
    cardTheme: const CardThemeData(
      color: AppColors.branco,
      elevation: 1,
      margin: EdgeInsets.zero,
      shadowColor: Color(0x10153B31),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(20)),
      ),
    ),
    navigationBarTheme: const NavigationBarThemeData(
      backgroundColor: Colors.white,
      indicatorColor: Color(0xFFE4F4EA),
      elevation: 12,
      height: 70,
      labelTextStyle: WidgetStatePropertyAll(
        TextStyle(fontSize: 10, fontWeight: FontWeight.w600),
      ),
    ),
  );
}
