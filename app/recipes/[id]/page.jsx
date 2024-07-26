"use client";
import { useDebugValue, useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { auth, db, storage } from "../../../firebase";
import {
  doc,
  getDocs,
  getDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";

export default function Recipe({ params }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getRecipeDetails = async () => {
      const recipe = await getDoc(doc(db, "recipes", params.id));
      const data = recipe.data();
      setTitle(data.title);
      setInstructions(data.instructions);
      setIngredients(data.ingredients);
      setImageUrl(data.imageUrl);
    };

    getRecipeDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = doc(db, "recipes", params.id);
    await updateDoc(recipe, {
      title: title,
      ingredients: ingredients,
      instructions: instructions,
    });

    // Optionally, redirect to another page (e.g., recipe list page)
    router.push("/");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      <form onSubmit={handleSubmit}>
        <h1 className="text-center my-3">Update Recipe</h1>
        <div className="mb-3">
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients"
            rows="5"
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Instructions"
            rows="5"
            required
          />
        </div>

        <button className="btn btn-success" type="submit">
          Update Recipe
        </button>
      </form>
    </div>
  );
}
