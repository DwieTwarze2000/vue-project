<template>
  <div v-if="isLogged">
    <div class="title mb-5 mt-2 ms-1 ms-sm-4">
      <h2 class="d-flex align-items-center">
        <img src="../assets/phone.svg" alt="phone" class="me-3 settings-icon" />
        {{ $t('phoneCallHistory.title') }}
      </h2>
    </div>
    <div class="mt-4 mx-2 mx-sm-5">
      <table>
        <thead>
          <tr>
            <th>{{ $t('phoneCallHistory.phoneNumber') }}</th>
            <th>{{ $t('phoneCallHistory.date') }}</th>
            <th>{{ $t('phoneCallHistory.hour') }}</th>
            <th>{{ $t('phoneCallHistory.duration') }}</th>
            <th>{{ $t('phoneCallHistory.status') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(phoneCallData, idx) in historyData" :key="idx">
            <td>{{ phoneCallData.phoneNumber }}</td>
            <td>{{ getDate(phoneCallData.createdAt) }}</td>
            <td>{{ getTime(phoneCallData.createdAt) }}</td>
            <td>
              <span v-if="phoneCallData.status === CallStatus.ANSWERED">
                {{ formatSeconds(phoneCallData.callDuration) }}
              </span>
              <span v-else>-</span>
            </td>
            <td
              v-if="phoneCallData.status === CallStatus.ANSWERED"
              class="status bg-success"
            >
              {{ $t('phoneCallHistory.success') }}
            </td>

            <td
              v-if="phoneCallData.status === CallStatus.BUSY"
              class="status bg-warning"
            >
              {{ $t('phoneCallHistory.busy') }}
            </td>
            <td
              v-if="phoneCallData.status === CallStatus.NO_ANSWER"
              class="status bg-warning"
            >
              {{ $t('phoneCallHistory.noAnswer') }}
            </td>
            <td
              v-if="phoneCallData.status === CallStatus.FAILED"
              class="status bg-danger"
            >
              {{ $t('phoneCallHistory.failed') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { defaultGet } from '../services/api.service';
import { PhoneCallData, CallStatus } from '../types/call.type';
import { formatSeconds } from '../utils/phone.utils';
import { getDate, getTime } from '../utils/date.utils';

const store = useStore();
const isLogged = ref(false);
const historyData = ref([]);

const fetchPhoneHistoryData = async (): Promise<void> => {
  const phoneCallHistoryData: PhoneCallData[] = await defaultGet(
    'phoneCall/history',
    true
  );

  if (phoneCallHistoryData) {
    historyData.value = phoneCallHistoryData;
  }
};

watchEffect((): void => {
  const token = store.state.token;
  isLogged.value = !!token;

  if (isLogged.value) {
    fetchPhoneHistoryData();
  }
});
</script>
<style scoped>
.title h2 {
  font-weight: bold;
  font-size: 32px;
}

.settings-icon {
  width: 32px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 15px;
  text-align: left;
}

.badge {
  width: 100%;
  height: 100%;
}
</style>
