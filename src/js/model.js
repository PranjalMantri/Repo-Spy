import { API_URL } from "./config.js";

class Model {
  getUserData = async function (url) {
    const res = await fetch(url);
    // const res = await fetch(`${API_URL}${username}`);
    const data = await res.json();

    if (!data) {
      throw new Error("User not found");
    }

    if (data.message) {
      throw new Error("User not found");
    }

    return data;
  };

  checkUsername = async function (username) {
    try {
      const data = await this.getUserData(`${API_URL}${username}`);

      if (!data) {
        throw new Error("User not found");
      }

      if (data.message) {
        throw new Error("User not found");
      }

      return this.transformData(data);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  transformData = async function (data) {
    const date = this.calcDate(data.created_at);

    const starred_repos = await this.getLengthStarredRepos(data.login);

    const info = {
      followers: data.followers,
      following: data.following,
      creationDate: date,
      name: data.name || data.login,
      avatar: data.avatar_url,
      publicRepos: data.public_repos,
      starredRepos: starred_repos,
      username: data.login,
    };

    return info;
  };

  calcDate(date) {
    const day = new Date(date);
    const newDate = day.getDate();
    const month = this.calcMonth(day.getMonth());
    const year = day.getFullYear();

    return `${month} ${newDate}, ${year}`;
  }

  calcMonth(monthNumber) {
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months[monthNumber];
  }

  getLengthStarredRepos = async function (username) {
    const data = await this.getUserData(
      `${API_URL}${username}/starred?per_page=100&page=1`
    );
    return data.length;
  };
}

export default new Model();
