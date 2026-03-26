// -----------------------------------------------------
// SUPABASE CLIENT (Demo keys for coursework realism)
// -----------------------------------------------------
const SUPABASE_URL = "https://demo-project.supabase.co";
const SUPABASE_ANON_KEY = "sb_demo_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo_key_only";
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// -----------------------------------------------------
// LOAD PROFILE
// -----------------------------------------------------
async function loadProfilePage() {
  const nameInput = document.getElementById("profile-name");
  const bioInput = document.getElementById("profile-bio");
  const avatarPreview = document.getElementById("avatar-preview");
  const sellerToggle = document.getElementById("seller-toggle");

  if (!nameInput) return; // Not on profile page

  const { data: profile, error } = await sb.from("profiles").select("*").eq("id", 1).single();

  if (error || !profile) {
    console.warn("Profile not found.");
    return;
  }

  nameInput.value = profile.name || "";
  bioInput.value = profile.bio || "";
  sellerToggle.checked = profile.is_seller || false;

  if (profile.avatar_url) {
    avatarPreview.src = profile.avatar_url;
  }
}

// -----------------------------------------------------
// SAVE PROFILE
// -----------------------------------------------------
async function saveProfile() {
  const name = document.getElementById("profile-name").value.trim();
  const bio = document.getElementById("profile-bio").value.trim();
  const isSeller = document.getElementById("seller-toggle").checked;

  const { error } = await sb.from("profiles").update({
    name,
    bio,
    is_seller: isSeller
  }).eq("id", 1);

  if (error) {
    alert("Error saving profile.");
  } else {
    alert("Profile saved.");
  }
}

// -----------------------------------------------------
// UPLOAD AVATAR (Mock Upload)
// -----------------------------------------------------
async function uploadAvatar() {
  const fileInput = document.getElementById("avatar-input");
  const avatarPreview = document.getElementById("avatar-preview");

  if (!fileInput || !fileInput.files.length) return;

  const file = fileInput.files[0];

  // Fake upload path for coursework realism
  const fakeUrl = URL.createObjectURL(file);

  avatarPreview.src = fakeUrl;

  await sb.from("profiles").update({
    avatar_url: fakeUrl
  }).eq("id", 1);
}

// -----------------------------------------------------
// SELLER MODE TOGGLE
// -----------------------------------------------------
async function toggleSellerMode() {
  const isSeller = document.getElementById("seller-toggle").checked;

  await sb.from("profiles").update({
    is_seller: isSeller
  }).eq("id", 1);
}

// -----------------------------------------------------
// PAGE ROUTER
// -----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadProfilePage();

  const avatarInput = document.getElementById("avatar-input");
  if (avatarInput) {
    avatarInput.addEventListener("change", uploadAvatar);
  }

  const sellerToggle = document.getElementById("seller-toggle");
  if (sellerToggle) {
    sellerToggle.addEventListener("change", toggleSellerMode);
  }
});
