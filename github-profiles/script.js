const GITHUB_API_URL = "https://api.github.com/users/";

const getUser = async (userName) => {
  const response = await fetch(GITHUB_API_URL + userName);
  const JSONData = await response.json();



  generateProfile(JSONData);
  getRepos(userName);
};

getUser("nicejobmaster");

const generateProfile = (profile) => {
  const profileContainerEl = document.getElementById("profile-container");

  profileContainerEl.innerHTML = `
  <div class="profile">
    <div class="avatar-container">
      <div class="avatar">
        <img src="${profile.avatar_url}" />
      </div>
    </div>
    <div class="name">${profile.name}</div>
    <div class="info-user">${profile.login}</div>
    <div class="info-user">${profile.bio}</div>
    <div class="follow-container">
      <span class="follow-info">${profile.followers} Followers</span>
      <span class="follow-info">${profile.following} Following</span>
      <span class="follow-info">${profile.public_repos} Repos</span>
    </div>
    <div class="repos-container">
      <p>REPOS</p>
      <div id="repos-wrapper">
      </div>
    </div>
  </div>`;
};

const getRepos = async (userName) => {
  const response = await fetch(GITHUB_API_URL + userName + "/repos");
  const JSONData = await response.json();

  generateRepos(JSONData);
};

const generateRepos = (repos) => {
  const reposWrapperEl = document.getElementById("repos-wrapper");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;
      reposWrapperEl.appendChild(repoEl);
    });
};

document.getElementById("search").addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.target.value) {
    getUser(e.target.value);
    e.target.value = "";
  }
});
