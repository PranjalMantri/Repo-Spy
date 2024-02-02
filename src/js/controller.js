import model from "./model.js";
import homeView from "./HomeView.js";

class App {
  #form = document.querySelector(".searchForm");

  constructor() {
    this.#form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userName = homeView.getSearchQuery();

      if (!userName) {
        this._invalidUsername();
        return;
      }

      homeView.renderLoadingCircle();
      try {
        const data = await model.checkUsername(userName);
        homeView.displayUserInfo(data);
      } catch (err) {
        homeView.renderError(err.message);
      }
    });
  }
}

const app = new App();
