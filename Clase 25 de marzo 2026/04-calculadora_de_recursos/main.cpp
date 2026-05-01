#include <iostream>
#include <string>

using namespace std;

int main(){

    int process1;
    int process2;
    int addition;
    int difference;

    cout << "ingrese el consumo de la primera mermoria RAM (megabytes):";
    cin >> process1;
    cout<< "ingrese el consumo de la segunda mermoria RAM (megabytes):";
    cin >> process2;

    addition = process1 + process2;
    
    if(process1 > process2){
        difference = process1 - process2;
    }else{
        difference = process2 - process1;
    }

    cout << "La suma del consumo de ambas memorias RAM es de: " << addition << " megabytes\n" << "La diferencia del consumo entre ambas memorias es de: " << difference << " megabytes";

    return 0;
}