::compilo el binario
g++ -std=c++17 -Wall -Wpedantic -Werror -I.\include main.cpp src\consola.cpp src\menues.cpp src\operaciones.cpp -o Actividad_Evaluativa_I.exe

::limpio los codigos objetos
DEL.\*.o

::ejecuto el programa
Actividad_Evaluativa_I.exe