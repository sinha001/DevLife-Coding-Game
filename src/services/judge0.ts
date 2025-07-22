import type { SupportedLanguage } from "../services/judge0"

export const CODE_TEMPLATES: Record<SupportedLanguage, Record<string, string>> = {
  javascript: {
    "Array Sum Challenge": `function arraySum(arr) {
    // Write your solution here
    // Example: return arr.reduce((sum, num) => sum + num, 0);
    
}

// Test your function
const input = [1, 2, 3, 4, 5];
console.log(arraySum(input));`,

    "String Palindrome": `function isPalindrome(str) {
    // Write your solution here
    // Remove spaces and convert to lowercase
    // Check if string reads same forwards and backwards
    
}

// Test your function
const input = "racecar";
console.log(isPalindrome(input));`,

    "Two Sum Problem": `function twoSum(nums, target) {
    // Write your solution here
    // Return indices of two numbers that add up to target
    
}

// Test your function
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target));`,
  },

  python: {
    "Array Sum Challenge": `def array_sum(arr):
    # Write your solution here
    # Example: return sum(arr)
    pass

# Test your function
input_arr = [1, 2, 3, 4, 5]
print(array_sum(input_arr))`,

    "String Palindrome": `def is_palindrome(s):
    # Write your solution here
    # Remove spaces and convert to lowercase
    # Check if string reads same forwards and backwards
    pass

# Test your function
input_str = "racecar"
print(is_palindrome(input_str))`,

    "Two Sum Problem": `def two_sum(nums, target):
    # Write your solution here
    # Return indices of two numbers that add up to target
    pass

# Test your function
nums = [2, 7, 11, 15]
target = 9
print(two_sum(nums, target))`,
  },

  java: {
    "Array Sum Challenge": `import java.util.*;

public class Solution {
    public static int arraySum(int[] arr) {
        // Write your solution here
        // Example: return Arrays.stream(arr).sum();
        return 0;
    }
    
    public static void main(String[] args) {
        int[] input = {1, 2, 3, 4, 5};
        System.out.println(arraySum(input));
    }
}`,

    "String Palindrome": `public class Solution {
    public static boolean isPalindrome(String s) {
        // Write your solution here
        // Remove spaces and convert to lowercase
        // Check if string reads same forwards and backwards
        return false;
    }
    
    public static void main(String[] args) {
        String input = "racecar";
        System.out.println(isPalindrome(input));
    }
}`,

    "Two Sum Problem": `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        // Return indices of two numbers that add up to target
        return new int[]{};
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        System.out.println(Arrays.toString(twoSum(nums, target)));
    }
}`,
  },

  cpp: {
    "Array Sum Challenge": `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int arraySum(vector<int>& arr) {
    // Write your solution here
    // Example: return accumulate(arr.begin(), arr.end(), 0);
    return 0;
}

int main() {
    vector<int> input = {1, 2, 3, 4, 5};
    cout << arraySum(input) << endl;
    return 0;
}`,

    "String Palindrome": `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

bool isPalindrome(string s) {
    // Write your solution here
    // Remove spaces and convert to lowercase
    // Check if string reads same forwards and backwards
    return false;
}

int main() {
    string input = "racecar";
    cout << (isPalindrome(input) ? "true" : "false") << endl;
    return 0;
}`,

    "Two Sum Problem": `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    // Return indices of two numbers that add up to target
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = twoSum(nums, target);
    for (int i : result) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}`,
  },

  c: {
    "Array Sum Challenge": `#include <stdio.h>

int arraySum(int arr[], int size) {
    // Write your solution here
    int sum = 0;
    // Add your logic here
    return sum;
}

int main() {
    int input[] = {1, 2, 3, 4, 5};
    int size = sizeof(input) / sizeof(input[0]);
    printf("%d\\n", arraySum(input, size));
    return 0;
}`,
  },

  csharp: {
    "Array Sum Challenge": `using System;
using System.Linq;

public class Solution {
    public static int ArraySum(int[] arr) {
        // Write your solution here
        // Example: return arr.Sum();
        return 0;
    }
    
    public static void Main() {
        int[] input = {1, 2, 3, 4, 5};
        Console.WriteLine(ArraySum(input));
    }
}`,
  },

  go: {
    "Array Sum Challenge": `package main

import "fmt"

func arraySum(arr []int) int {
    // Write your solution here
    sum := 0
    // Add your logic here
    return sum
}

func main() {
    input := []int{1, 2, 3, 4, 5}
    fmt.Println(arraySum(input))
}`,
  },

  rust: {
    "Array Sum Challenge": `fn array_sum(arr: &[i32]) -> i32 {
    // Write your solution here
    // Example: arr.iter().sum()
    0
}

fn main() {
    let input = vec![1, 2, 3, 4, 5];
    println!("{}", array_sum(&input));
}`,
  },

  typescript: {
    "Array Sum Challenge": `function arraySum(arr: number[]): number {
    // Write your solution here
    // Example: return arr.reduce((sum, num) => sum + num, 0);
    return 0;
}

// Test your function
const input: number[] = [1, 2, 3, 4, 5];
console.log(arraySum(input));`,
  },
}

export function getCodeTemplate(language: SupportedLanguage, challengeTitle: string): string {
  const templates = CODE_TEMPLATES[language]
  return templates[challengeTitle] || templates["Array Sum Challenge"] || `// Write your ${language} solution here`
}
