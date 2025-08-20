#!/usr/bin/env python3
"""
Main Python Project File
"""
import typing

def isUnique(name : str) -> bool:
    char_dict = {}
    for char in name:
        if char in char_dict:
            return False
        char_dict[char] = 1
    return True

def main():
    print(isUnique("dan"))

if __name__ == "__main__":
    main() 