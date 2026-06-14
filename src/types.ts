// types.ts

export type CuisineType = 
  | "Indian" | "Mexican" | "Bengali" | "Gujarati" | "Continental" | "Chinese";

export type CourseType = 
  | "Breakfast" | "Lunch" | "Dinner" | "Snacks";

export type DietType = 
  | "Vegetarian" 
  | "High Protein Vegetarian" 
  | "Non Vegeterian" 
  | "Eggetarian" 
  | "Diabetic Friendly" 
  | "High Protein Non Vegetarian" 
  | "No Onion No Garlic (Sattvic)" 
  | "Vegan" 
  | "Gluten Free" 
  | "Sugar Free Diet";

export const DIET_OPTIONS: DietType[] = [
  "Vegetarian", 
  "High Protein Vegetarian", 
  "Non Vegeterian", 
  "Eggetarian", 
  "Diabetic Friendly", 
  "High Protein Non Vegetarian", 
  "No Onion No Garlic (Sattvic)", 
  "Vegan", 
  "Gluten Free", 
  "Sugar Free Diet"
];

export const SERVING_OPTIONS = [
  "1-2 People",
  "3-4 People",
  "5+ People"
];

// This interface matches your SQLite Database columns exactly
export interface Recipe {
  id: number;
  title: string;
  cuisine: string;      
  course: string;       
  diet: string;         
  servings: number;
  prep_time: number;    
  cook_time: number;    
  total_time: number;   
  ingredients: string;  // Stored as a CSV string in DB
  instructions: string; 
}

// Interface for the Filter State
export interface FilterState {
  servings: string[];
  cuisine: string[];
  course: string[];
  diet: string[];
}