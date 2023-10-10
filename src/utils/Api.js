 const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    authorization: '32119456-426d-4754-a261-d86b8af5b953',
    "content-type": "application/json"
  }
};

class Api {
  #url;
  #headers;
  constructor(apiConfig) {
    this.#headers = apiConfig.headers;
    this.#url = apiConfig.url;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.#url}/users/me`, {
      method: 'GET',
      headers: this.#headers
    })
    .then((res) => this._getResponse(res))
  }

  editProfile(data) {
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({name: data.name, about: data.about})
    })
    .then((res) => this._getResponse(res))
  }

  changeProfileAvatar(data) {
    return fetch(`${this.#url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        avatar: data
      })
    })
    .then((res) => this._getResponse(res))
  }

  getInitialCards() {
    return fetch(`${this.#url}/cards`, {
      method: 'GET',
      headers: this.#headers
    })
    .then((res) => this._getResponse(res))
  }

  addNewCard(cardData) {
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify({name: cardData.name, link: cardData.link})
    })
    .then((res) => this._getResponse(res))
  }

  deleteMyCard(id) {
    return fetch(`${this.#url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.#headers
    })
    .then((res) => this._getResponse(res))
  }

  setCardLike(id) {
    return fetch(`${this.#url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.#headers
    })
    .then((res) => this._getResponse(res))
  }

  removeCardLike(id) {
    return fetch(`${this.#url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.#headers
    })
    .then((res) => this._getResponse(res))
  }
}

export const api = new Api(apiConfig);