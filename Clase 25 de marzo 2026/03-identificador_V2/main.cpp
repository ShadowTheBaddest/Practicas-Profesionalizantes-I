#include <iostream>
#include <string>

int main(){
    std::string name;
    std::string last_name;
    int b_year;
    int last_digit;
    
    std::cout << "Enter your name:";
    std::cin >> name;
    std::cout << "Enter your last name:";
    std::cin >> last_name;
    std::cout << "Enter your year of birthday:";
    std::cin >> b_year;

    last_digit = b_year % 100;

    std::cout << "welcome," << name << " " << last_name << "\n" << "Your identifier is:" << name[0] << last_name;

    if (last_digit <10)
    {
        std::cout << "0";
    }

    std::cout << last_digit << "\n" << "You are " << 2026 - b_year << " years old." << std::endl;

    return 0;
}
