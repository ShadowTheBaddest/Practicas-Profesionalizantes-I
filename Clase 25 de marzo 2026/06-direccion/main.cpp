#include <iostream>
#include <string>

using namespace std;

int main(){
    string street;
    string city;
    string state;
    string cp;

cout << "ingrese su numero de codigo postal: ";
cin >>  cp;
cout << "ingrese su calle: ";
//utilizamos cin.ignore*() para limpiar el buffer de entrada (limpia el enter pendiente) antes de leer la linea completa con getline()
cin.ignore();
getline(cin, street);
cout << "ingrese su ciudad:";
getline(cin, city);
cout << "ingrese su provincia: "; 
getline(cin, state);

cout << "----Etiqueta de direccion----" << endl;
cout << "Calle: " << street << "\n" << "Ciudad: " << city << "\n" << "Provincia: " << state << "\n" << "Codigo Postal: " << cp;

return 0;
}
