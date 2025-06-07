async function getProfile() {
  const usernameInput = document.getElementById("usernameInput");
  const profileContainer = document.getElementById("profile");

  const username = usernameInput.value.trim();

  if (!username) {
    alert("Please enter a GitHub username.");
    return;
  }

  try {
    // Fetch user profile
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error(`User not found (status: ${response.status})`);
    }
    const data = await response.json();

    // Fetch user repositories
    const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!repoResponse.ok) {
      throw new Error("Could not fetch repositories.");
    }
    const repos = await repoResponse.json();

    // Build profile and repo display
    profileContainer.innerHTML = `
  <div class="profile-card">
  <div class="profile-header">
    <img src="${data.avatar_url}" alt="${data.login}'s avatar">
    <h2>${data.name || data.login}</h2>
    <p>${data.bio || "No bio provided."}</p>
  </div>

  <div class="profile-info-grid">
    <p><strong>Public Repos:</strong> ${data.public_repos || "Not available"}</p>
    <p><strong>Public Gists:</strong> ${data.public_gists || "Not available"}</p>
    <p><strong>Following:</strong> ${data.following}</p>
    <p><strong>Followers:</strong> ${data.followers || "Not available"}</p>
    <p><strong>Email:</strong> ${data.email || "Not available"}</p>
    <p><strong>Location:</strong> ${data.location || "Not available"}</p>
    <p><strong>Company:</strong> ${data.company || "Not available"}</p>
    <p><strong>Created At:</strong> ${new Date(data.created_at).toLocaleDateString()}</p>


   <div class="view-profile-link">
  <a href="${data.html_url}" target="_blank">View Profile on GitHub</a>
</div>

  </div>
</div>

    `;
  } catch (error) {
    profileContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}
