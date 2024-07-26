"use client"
import Link from "next/link";
import RecipeCard from "./components/RecipeCard";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore"
import {db} from "../firebase";

export default function Home() {
  const [recipesList, setRecipesList] = useState([]);

  useEffect(() => {
    const getRecipesList = async () => {
      const recipesCollection = collection(db, "recipes");
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipes = recipesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setRecipesList(recipes);
    }
    getRecipesList();
  }, [])
  return (
    <main className="container my-3">
      <div className="d-flex justify-content-between">
        <h4>Recipe List</h4>
        <Link href={"/recipes/create"} className="btn btn-primary">Add new Recipe</Link>
      </div>
      <div className="d-flex flex-wrap">
        {recipesList.map(item => {
          return item.imageUrl ? <RecipeCard props={item}></RecipeCard> : null;
        })}
      </div>
    </main>
  )
}
