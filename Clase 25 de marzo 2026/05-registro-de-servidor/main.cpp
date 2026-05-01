#include <iostream>
#include <string>

using namespace std;

int main(){
    
    string servername;
    int cores;
    float temp;

    cout << "ingrese el nombre del servidor: ";
    cin >> servername;
    cout << "ingrese la cantidad de nucleos: ";
    cin >> cores;
    cout << "ingrese la temperatura (grados celsius): ";
    cin >> temp;

    cout << "Nombre del servidor: " << servername << "\n" << "Cantidad de nucleos: " << cores << "\n" << "La temperatura es de " << temp << " grados celsius" <<endl;

    return 0;
}
