<template>
  <div>
    <div class="title mb-5 mt-2 ms-1 ms-sm-4">
      <h2 class="d-flex align-items-center">
        <img src="../assets/settings-light.svg" class="me-3 settings-icon" />
        {{ $t('settings.title') }}
      </h2>
    </div>
    <div class="ms-2 ms-sm-5">
      <table>
        <tr>
          <td class="prop pe-4">{{ $t('settings.language.title') }}:</td>
          <td class="d-flex flex-row align-items-center flex-wrap">
            <button
              class="btn main-button me-3"
              @click="setNewLanguage(Language.PL)"
              :class="{ active: activeLanguage === Language.PL }"
            >
              {{ $t('settings.language.polish') }}
            </button>
            <button
              class="btn main-button me-3"
              @click="setNewLanguage(Language.EN)"
              :class="{ active: activeLanguage === Language.EN }"
            >
              {{ $t('settings.language.english') }}
            </button>
            <button
              class="btn main-button"
              @click="setNewLanguage(Language.DE)"
              :class="{ active: activeLanguage === Language.DE }"
            >
              {{ $t('settings.language.german') }}
            </button>
          </td>
        </tr>
        <tr>
          <td class="prop pe-4">{{ $t('settings.theme.title') }}:</td>
          <td class="d-flex flex-row align-items-center flex-wrap">
            <button
              class="btn main-button me-3"
              @click="setNewTheme(Theme.LIGHT)"
              :class="{ active: activeTheme === Theme.LIGHT }"
            >
              {{ $t('settings.theme.light') }}
            </button>
            <button
              class="btn main-button me-3"
              @click="setNewTheme(Theme.DARK)"
              :class="{ active: activeTheme === Theme.DARK }"
            >
              {{ $t('settings.theme.dark') }}
            </button>
          </td>
        </tr>
      </table>

      <div class="mt-4 mb-3 fs-5" v-if="isLogged && user">
        <div class="d-flex align-items-center gap-4">
          <div>Ustawienia użytkownika:</div>
          <button class="btn main-button active me-3">Zapisz ustawienia</button>
        </div>
        <div class="mb-3">
          <label>Login:</label>
          <input
            type="text"
            class="form-control login-input"
            :value="user.login"
            disabled
          />
        </div>
        <div class="mb-3">
          <label>Telefon główny:</label>
          <input
            type="text"
            class="form-control login-input"
            :value="user.mainPhoneNumber"
          />
        </div>
        <div class="mb-3">
          <label>Stare hasło:</label>
          <input type="password" class="form-control login-input" />
        </div>
        <div class="mb-3">
          <label>Nowe hasło:</label>
          <input type="password" class="form-control login-input" />
        </div>

        <button
          class="btn main-button active me-3 mt-4 mb-3"
          @click="showAddAnotherPhoneForm = !showAddAnotherPhoneForm"
        >
          <!-- {{ $t('settings.addUser.title') }} -->
          Dodaj kolejny numer telefonu
        </button>
        <div v-if="showAddAnotherPhoneForm">
          <div class="mb-3">
            <label>Nazwa:</label>
            <input type="text" class="form-control login-input" />
          </div>
          <div class="mb-3">
            <label>Telefon:</label>
            <input type="text" class="form-control login-input" />
          </div>
          <div
            class="d-flex flex-column flex-md-row mt-3 text-center text-md-left"
          >
            <button class="btn main-button active me-3">Dodaj</button>
          </div>
        </div>
        <div class="users d-flex flex-row gap-3 mt-4 flex-wrap">
          <div class="user p-4 d-flex flex-column text-center">
            <img
              v-if="activeTheme === Theme.LIGHT"
              src="../assets/user-dark.svg"
              alt="user"
              class="mb-2"
            />
            <img
              v-else
              src="../assets/user-light.svg"
              alt="user"
              class="mb-2"
            />
            <p class="mb-2">Główny</p>
            <p>{{ user.mainPhoneNumber }}</p>
          </div>

          <div
            class="user p-4 d-flex flex-column text-center"
            v-for="phoneData in user.phoneNumbers"
            :key="phoneData.id"
          >
            <img
              v-if="activeTheme === Theme.LIGHT"
              src="../assets/x-symbol.svg"
              class="delete"
            />
            <img v-else src="../assets/x-symbol_white.svg" class="delete" />
            <img
              v-if="activeTheme === Theme.LIGHT"
              src="../assets/user-dark.svg"
              alt="user"
              class="mb-2"
            />
            <img
              v-else
              src="../assets/user-light.svg"
              alt="user"
              class="mb-2"
            />
            <p class="mb-2">{{ phoneData.name }}</p>
            <p>{{ phoneData.number }}</p>
          </div>
        </div>
        <div class="mt-4 mb-4">
          <button class="btn main-button cancel me-3" @click="deleteAccount()">
            Usuń konto
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { saveTheme, getTheme, setThemeColors } from '../utils/theme.utils';
import { getLanguage, saveLanguage } from '../utils/language.utils';
import { ref, watchEffect } from 'vue';
import { Theme } from '../types/theme.type';
import { Language } from '../types/i18n.type';
import { i18n } from '../main';
import { defaultDelete, defaultGet } from '../services/api.service';
import { getToken, removeToken, getUser } from '../utils/auth.utils';
import { useStore } from 'vuex';
import { cleanPhoneNumber } from '../utils/phone.utils';

const store = useStore();
const isLogged = ref(false);

const activeTheme = ref(getTheme());
const activeLanguage = ref(getLanguage());
const user = ref(null);
const showAddAnotherPhoneForm = ref(false);

const fetchUser = async () => {
  const userData = await getUser();
  if (userData) {
    user.value = userData;
  }
};

watchEffect((): void => {
  const token = store.state.token;
  isLogged.value = !!token;

  if (isLogged.value) {
    fetchUser();
  } else {
    user.value = null;
  }
});

const setNewTheme = (theme: Theme): void => {
  saveTheme(theme);
  setThemeColors(theme);
  activeTheme.value = theme;
};

const setNewLanguage = (language: Language): void => {
  saveLanguage(language);
  i18n.global.locale = language;
  activeLanguage.value = language;
};

const deleteAccount = async (): Promise<void> => {
  const approved = confirm('Czy na pewno chcesz usunąć konto?');
  if (!approved) {
    return;
  }
  const response = await defaultDelete('auth/user', true);
  if (response) {
    store.commit('logout');
    removeToken();
  }
};
</script>
<style scoped>
.title h2 {
  font-weight: bold;
  font-size: 32px;
}

.prop {
  font-size: 20px;
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
  background-color: rgba(255, 255, 255, 0.1);

  color: var(--color);

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

.settings-icon {
  width: 32px;
}

input:disabled {
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
}

label {
  font-size: 14px;
}
</style>
