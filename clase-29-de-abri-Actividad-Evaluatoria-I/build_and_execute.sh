##compilo el binario
g++ -std=c++17 -Wall -Wpedantic -Werror -I.\include main.cpp src\operaciones.cpp src\menues.cpp src\consola.cpp -o Actividad_Evaluativa_I.exe

##limpio los codigos objetos
rm ./*.o

##ejecuto el programa
./ Actividad_Evaluativa_I.exe