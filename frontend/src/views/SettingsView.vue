<template>
  <div>
    <div class="title mb-5 mt-2 ms-1 ms-sm-4">
      <h2 class="d-flex align-items-center">
        <img src="../assets/settings-dark.svg" class="me-3" />Ustawienia
      </h2>
    </div>
    <div class="ms-2 ms-sm-5">
      <table>
        <tr>
          <td class="prop pe-4">Język:</td>
          <td class="d-flex flex-row align-items-center flex-wrap">
            <button class="btn main-button me-3">Polski</button>
            <button class="btn main-button active me-3">Angielski</button>
            <button class="btn main-button">Niemiecki</button>
          </td>
        </tr>
        <tr>
          <td class="prop pe-4">Motyw:</td>
          <td class="d-flex flex-row align-items-center flex-wrap">
            <button class="btn main-button active me-3">Jasny</button>
            <button class="btn main-button me-3">Ciemny</button>
          </td>
        </tr>
      </table>

      <button class="btn main-button active me-3 mt-4">
        Dodaj użytkownika
      </button>
      <table>
        <tr>
          <td class="prop pe-4">Imie:</td>
          <td>
            <input type="text" />
          </td>
        </tr>
        <tr>
          <td class="prop pe-4">Numer telefonu:</td>
          <td>
            <input type="text" />
          </td>
        </tr>
        <tr>
          <td>
            <button class="btn main-button me-3">Anuluj</button>
          </td>
          <td class="d-flex">
            <button class="btn main-button active me-3">Zapisz</button>
          </td>
        </tr>
      </table>

      <div class="users d-flex flex-row gap-3 mt-4 flex-wrap">
        <div class="user p-4 d-flex flex-column text-center">
          <img src="../assets/x-symbol.svg" class="delete" />
          <img src="../assets/user-dark.svg" alt="user" class="mb-2" />
          <p class="mb-2">Jacek</p>
          <p>532 232 321</p>
        </div>
        <div class="user p-4 d-flex flex-column text-center">
          <img src="../assets/x-symbol.svg" class="delete" />
          <img src="../assets/user-dark.svg" alt="user" class="mb-2" />
          <p class="mb-2">Paweł</p>
          <p>532 241 221</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.title h2 {
  font-weight: bold;
  font-size: 32px;
}

.prop {
  font-size: 20px;
}

.main-button {
  background-color: #af0e0e;
  border-radius: 16px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  border: none;
  min-width: 150px;
}
.main-button:hover {
  background-color: #f00e0e;
  color: white;
}
.main-button:active {
  position: relative;
  top: 5px;
  color: white;
}

.main-button.active {
  background-color: #2e9a53;
  color: white;
  font-weight: 400;
}

.main-button.active:hover {
  background-color: #258346;
}

table {
  border-collapse: separate;
  border-spacing: 0 20px;
}

input {
  border-radius: 8px;
  padding: 0 10px;
}

.user {
  background-color: #bfd1ff;
  border-radius: 16px;
  min-width: 175px;
  position: relative;
}

.user img {
  max-height: 60px;
}

.delete {
  position: absolute;
  width: 15px;
  top: 5px;
  right: 5px;
}
</style>
