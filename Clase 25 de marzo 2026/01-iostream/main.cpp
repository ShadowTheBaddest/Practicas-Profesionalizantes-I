#include <iostream>
#include <string>

int main() {
  std::string username;
  int userage;

  //salida de datos: Se utiliza el operador de insercion (<<) para enviar datos a la consola
  std::cout << "enter your name: ";

  //Entrada de datos: Se utiliza el operador de extraccion (>>) para leer desde el teclado
  std::cin>> username;
  
  std::cout << "enter your age: ";
    std::cin >> userage;
    //Cconcatenacion de flujo de salida:
    //Nota de rendimiento: se prefiere ''
    std::cout << "access granted welcome, "<< username
              << "registered age "<< userage << "\n";

    return 0;
}