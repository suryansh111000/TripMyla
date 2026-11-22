// src/services/siteService.js
import { initialSiteData } from "../data/siteData";

const STORAGE_KEY = "tripmyla_demo_data_v1";

// Later, flip this flag to true and point to your PHP endpoints
const USE_PHP_API = false;
const API_BASE_URL = "/api";

export async function fetchSiteData() {
  if (USE_PHP_API) {
    const res = await fetch(`${API_BASE_URL}/get-site-data.php`);
    if (!res.ok) throw new Error("Failed to load site data from PHP backend");
    return await res.json();
  }

  // Local demo persistence so your friend can test live edits during demo
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : initialSiteData;
}

export async function saveSiteData(updatedData) {
  if (USE_PHP_API) {
    const res = await fetch(`${API_BASE_URL}/update-site-data.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    return await res.json();
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  return { success: true };
}

export function resetDemoData() {
  localStorage.removeItem(STORAGE_KEY);
  return initialSiteData;
}