class HomeView {
  _content = document.querySelector(".content");
  _inputSearchQuery = document.querySelector(".search-box");
  _error = document.querySelector(".error");

  getSearchQuery() {
    const searchQuery = this._inputSearchQuery.value;
    this._clearSearchInput();
    if (!searchQuery) return;

    return searchQuery;
  }

  _clearSearchInput() {
    this._inputSearchQuery.value = "";
    this._inputSearchQuery.blur();
  }

  _clearDOM(markup) {
    this._content.innerHTML = "";
    this._content.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(errorMessage) {
    this._content.innerHTML = "";
    this._content.textContent = errorMessage;
  }

  renderLoadingCircle() {
    const markup = `
    <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="100px"
          height="100px"
          class="loading-circle"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#ccc"
            stroke-width="8"
            fill="none"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0, 100; 100, 0; 0, 100"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              values="0; -100; -200"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>`;

    this._clearDOM(markup);
  }

  displayUserInfo(data) {
    if (data.starredRepos >= 100) {
      data.starredRepos = "100+";
    }

    const markup = `
    <article class="github-info"> 
        <div class="personal-info">
            <a href="${data.avatar}">
                <img class="avatar" src="${data.avatar}" alt="avatar" />
            </a>
            <div class="username">${data.name}</div>
        </div>
        
        <div class="additional-info">Date Joined: ${data.creationDate}</div>

        <div class="additional-info followers">
            <a class="remove-default" href="/followers.html?user=${data.username}" id="followersLink">Followers: ${data.followers}</a>
        </div>

        <div class="additional-info following">
            <a class="remove-default" href="/following.html">Following: ${data.following}</a>
        </div>

        <div class="additional-info public-repos">
            <a class="remove-default" href="/publicRepos.html">Public Repositories: ${data.publicRepos}</a>
        </div>

        <div class="additional-info starred-repos">
            <a class="remove-default" href="/starredRepos.html">Starred Repositories: ${data.starredRepos}</a> 
        </div>
    </article>`;
    this._clearDOM(markup);
  }
}

export default new HomeView();
