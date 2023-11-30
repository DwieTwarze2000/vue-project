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
          <div>{{ $t('settings.userSettings.title') }}:</div>
          <button class="btn main-button active me-3" @click="saveSettings()">
            {{ $t('settings.userSettings.saveSettings') }}
          </button>
        </div>
        <div class="mb-3">
          <label> {{ $t('settings.userSettings.login') }}:</label>
          <input
            type="text"
            class="form-control login-input"
            :value="user.login"
            disabled
          />
        </div>
        <div class="mb-3">
          <label> {{ $t('settings.userSettings.mainPhoneNumber') }}:</label>
          <input
            type="text"
            class="form-control login-input"
            v-model="mainPhoneNumber"
            @input="mainPhoneNumber = cleanPhoneNumber($event.target.value)"
          />
          <div v-if="mainPhoneNumberError" class="error fs-6">
            {{ mainPhoneNumberError }}
          </div>
        </div>
        <div class="mb-3">
          <label> {{ $t('settings.userSettings.oldPassword') }}:</label>
          <input
            type="password"
            class="form-control login-input"
            v-model="oldPassword"
          />
          <div v-if="oldPasswordError" class="error fs-6">
            {{ oldPasswordError }}
          </div>
        </div>
        <div class="mb-3">
          <label>{{ $t('settings.userSettings.newPassword') }}:</label>
          <input
            type="password"
            class="form-control login-input"
            v-model="newPassword"
          />
          <div v-if="newPasswordError" class="error fs-6">
            {{ newPasswordError }}
          </div>
        </div>

        <button
          class="btn main-button active me-3 mt-4 mb-3"
          @click="showAddAnotherPhoneForm = !showAddAnotherPhoneForm"
        >
          <!-- {{ $t('settings.addUser.title') }} -->
          {{ $t('settings.userSettings.addAnotherPhoneNumber') }}
        </button>
        <div v-if="showAddAnotherPhoneForm">
          <div class="mb-3">
            <label> {{ $t('settings.userSettings.phoneName') }}:</label>
            <input
              type="text"
              class="form-control login-input"
              v-model="phoneName"
            />
            <div v-if="phoneNameError" class="error fs-6">
              {{ phoneNameError }}
            </div>
          </div>
          <div class="mb-3">
            <label> {{ $t('settings.userSettings.phoneNumber') }}:</label>
            <input
              type="text"
              class="form-control login-input"
              v-model="phoneNumber"
              @input="phoneNumber = cleanPhoneNumber($event.target.value)"
            />
            <div v-if="phoneNumberError" class="error fs-6">
              {{ phoneNumberError }}
            </div>
          </div>
          <div
            class="d-flex flex-column flex-md-row mt-3 text-center text-md-left"
          >
            <button
              class="btn main-button active me-3"
              @click="addAnotherPhone()"
            >
              {{ $t('settings.userSettings.add') }}
            </button>
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
            <p class="mb-2">{{ $t('settings.userSettings.main') }}</p>
            <p>{{ user.mainPhoneNumber }}</p>
          </div>

          <div
            class="user p-4 d-flex flex-column text-center"
            v-for="(phoneData, idx) in phoneNumbers"
            :key="idx"
          >
            <img
              v-if="activeTheme === Theme.LIGHT"
              src="../assets/x-symbol.svg"
              class="delete"
              @click="deletePhoneNumber(idx)"
            />
            <img
              v-else
              src="../assets/x-symbol_white.svg"
              class="delete"
              @click="deletePhoneNumber(idx)"
            />
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
            {{ $t('settings.userSettings.deleteAccount') }}
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
import {
  defaultDelete,
  defaultGet,
  defaultPatch,
  defaultPost,
} from '../services/api.service';
import { getToken, removeToken, getUser } from '../utils/auth.utils';
import { useStore } from 'vuex';
import { cleanPhoneNumber } from '../utils/phone.utils';
import {
  DeleteUserResponse,
  PatchUserResponse,
  SaveUserError,
  User,
  UserData,
} from '../types/auth.type';

const store = useStore();
const isLogged = ref(false);

const activeTheme = ref(getTheme());
const activeLanguage = ref(getLanguage());
const user = ref(null);
const showAddAnotherPhoneForm = ref(false);

const mainPhoneNumber = ref('');
const mainPhoneNumberError = ref('');
const oldPassword = ref('');
const oldPasswordError = ref('');
const newPassword = ref('');
const newPasswordError = ref('');
const phoneNumbers = ref([]);

const phoneName = ref('');
const phoneNameError = ref('');
const phoneNumber = ref('');
const phoneNumberError = ref('');

const t = (key: string): string => {
  return i18n.global.t(key).toString();
};

const fetchUser = async (): Promise<void> => {
  const userData: User = await getUser();
  if (userData) {
    user.value = userData;
    phoneNumbers.value = userData.phoneNumbers;
    mainPhoneNumber.value = userData.mainPhoneNumber;
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

const addAnotherPhone = (): void => {
  phoneNameError.value = '';
  phoneNumberError.value = '';

  if (!phoneName.value) {
    phoneNameError.value = t('errors.nameRequired');
  }
  if (!phoneNumber.value) {
    phoneNumberError.value = t('errors.phoneNumberRequired');
  }
  if (phoneNameError.value || phoneNumberError.value) {
    return;
  }

  phoneNumbers.value.push({
    name: phoneName.value,
    number: phoneNumber.value,
  });

  phoneName.value = '';
  phoneNumber.value = '';
  showAddAnotherPhoneForm.value = false;
};

const deletePhoneNumber = (idx: number): void => {
  phoneNumbers.value.splice(idx, 1);
};

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
  const approved = confirm(t('settings.userSettings.doYouWantToDeleteAccount'));
  if (!approved) {
    return;
  }
  const response: DeleteUserResponse = await defaultDelete('auth/user', true);
  if (response.message) {
    store.commit('logout');
    removeToken();
  }
};

const saveSettings = async (): Promise<void> => {
  mainPhoneNumberError.value = '';
  oldPasswordError.value = '';
  newPasswordError.value = '';

  if (!mainPhoneNumber.value) {
    mainPhoneNumberError.value = t('errors.phoneNumberRequired');
  }
  if (!oldPassword.value && newPassword.value) {
    oldPasswordError.value = t('errors.oldPasswordRequired');
  }
  if (!newPassword.value && oldPassword.value) {
    newPasswordError.value = t('errors.newPasswordRequired');
  }
  if (
    mainPhoneNumberError.value ||
    oldPasswordError.value ||
    newPasswordError.value
  ) {
    return;
  }

  const userData: UserData = {
    mainPhoneNumber: mainPhoneNumber.value,
    oldPassword: oldPassword.value,
    newPassword: newPassword.value,
    phoneNumbers: phoneNumbers.value,
  };

  const response: PatchUserResponse = await defaultPatch(
    'auth/user',
    userData,
    true
  );

  if (response.error) {
    if (response.error === SaveUserError.INCORRECT_PASSWORD) {
      oldPasswordError.value = t('errors.passwordIncorrect');
    }
    return;
  }

  oldPassword.value = '';
  newPassword.value = '';
  alert(t('settings.userSettings.savedSettings'));
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
