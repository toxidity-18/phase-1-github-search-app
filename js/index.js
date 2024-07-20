const githubForm = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');

githubForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    await searchUsers(searchTerm);
    searchInput.value = '';
  }
});

async function searchUsers(searchTerm) {
  const url = `https://api.github.com/search/users?q=${searchTerm}`;
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  const response = await fetch(url, { headers });
  const data = await response.json();
  displayUsers(data.items);
}

function displayUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.login;
    li.addEventListener('click', () => getUserRepos(user.login));
    userList.appendChild(li);
  });
}

async function getUserRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  const response = await fetch(url, { headers });
  const data = await response.json();
  displayRepos(data);
}

function displayRepos(repos) {
  reposList.innerHTML = '';
  repos.forEach(repo => {
    const li = document.createElement('li');
    li.textContent = repo.name;
    reposList.appendChild(li);
  });
}
