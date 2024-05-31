<template>
  <div class="wrapper container">
    <div v-if="!isVerified" class="verification">
      <span class="span">Hello, {{ printedText }}</span>
      <h2>Age and Name Verification</h2>
      <form @submit.prevent="checkEligibility">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            placeholder="Enter your name"
          />
        </div>
        <div class="form-group">
          <label for="age">Age:</label>
          <input
            type="number"
            id="age"
            v-model="age"
            required
            placeholder="Enter your age"
          />
        </div>
        <button
          class="button"
          id="btn-submit"
          :disabled="isDisabled"
          type="submit"
        >
          Log In
        </button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
    <div v-else>
      <h1 class="wrapper__game">Remember Me, Vue 3</h1>
      <p class="wrapper__title">Remember and open all green cells</p>
      <Board />
    </div>
  </div>

  <div class="base">
    <div id="art"></div>
    <div id="title">すずめの戸締まり</div>
    <div id="artist">作者不詳</div>
    <div id="controls">
      <img
        @click="togglePlay"
        ref="playButton"
        class="play"
        src="@/assets/play.svg"
        v-if="isPlaying === false"
        width="25"
      />
      <img
        v-if="isPlaying === true"
        @click="togglePause"
        ref="pauseButton"
        class="pause"
        src="@/assets/pause.svg"
        width="25"
      />
      <img class="reset" @click="reset" src="@/assets/reset.svg" alt="" />
    </div>
    <audio
      ref="audio"
      src="src\assets\music\song.mp3"
      width="25"
      @ended="onAudioEnded"
    ></audio>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import Board from "./components/Board.vue";

const name = ref("");
const age = ref(null);
const errorMessage = ref("");
const isVerified = ref(false);

const isLoading = ref(false);
const isSuccess = ref(false);

const isDisabled = computed(() => {
  return !name.value || age.value === null || age.value < 10 || age.value > 75;
});

const checkEligibility = () => {
  if (age.value < 10 || age.value > 75) {
    errorMessage.value = "Вы не можете войти в эту игру.";
  } else {
    errorMessage.value = "";
    isVerified.value = true;
  }
};

// text

const text = "register and go to my game";

const printedText = ref("");
let currentIndex = 0;
let intervalId = null;
let isTypingForward = true;

const typeText = () => {
  intervalId = setInterval(() => {
    if (isTypingForward) {
      printedText.value += text[currentIndex];
      currentIndex++;
      if (currentIndex === text.length) {
        isTypingForward = false;
      }
    } else {
      printedText.value = printedText.value.slice(0, -1);
      currentIndex--;
      if (currentIndex === 0) {
        isTypingForward = true;
      }
    }
  }, 100);
};

onMounted(() => {
  typeText();
});

// music

const isPlaying = ref(false);
const audio = ref(null);
const togglePlay = () => {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const togglePause = () => {
  audio.value.pause();
  isPlaying.value = false;
};

const reset = () => {
  audio.value.currentTime = 0;
  audio.value.pause();
  isPlaying.value = false;
};

const onAudioEnded = () => {
  audio.value.currentTime = 0;
  audio.value.play();
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 40px;

  &__game {
    color: green;
    font-size: 40px;
    font-weight: 800;
    text-align: center;
  }

  &__title {
    color: rgb(146, 127, 255);
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    margin-top: 10px;
  }
}

.span {
  text-align: center;
  color: aqua;
  font-size: 16px;
  font-weight: 600;
}

.verification {
  border: 2px solid rgb(161, 157, 157);
  border-radius: 25px;
  padding: 50px 10px 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  margin-top: 50%;

  h2 {
    text-align: center;
    color: #fff;
  }

  form {
    display: flex;
    flex-direction: column;
    width: max-content;
    gap: 10px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    label {
      margin-left: 2px;
      color: rgb(127, 127, 249);
      font-family: Georgia, "Times New Roman", Times, serif;
      letter-spacing: 0.5px;
      font-weight: 600;
      font-size: 20px;
    }

    input {
      margin-top: 10px;
      padding: 5px;
      color: #fff;
      margin-left: 8px;
      width: 100%;
      background: transparent;
    }
  }

  .button {
    margin-top: 30px;
  }

  & .button:disabled {
    opacity: 0.5;
  }
}

.button {
  background-color: rgb(255, 255, 255);
  appearance: none;
  border: none;
  padding: 10px;
  color: #000;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
  transition: 0.4s;
  border-radius: 25px;

  &.loading {
    .button-text {
      display: none;
    }

    .button-loader {
      display: flex;
    }
  }

  &.success {
    background-color: var(--success-base);
  }

  &:hover {
    background-color: #2c2d2f;
    color: #fff;
  }

  &:active {
    transform: translate3d(3px, 3px, 0);
  }
}
.base {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 315px;
  height: 80px;
  border-radius: 8px;
  background-color: #242c37;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.362);
  @media (max-width: 420px) {
    width: 280px;
  }
}
.base div {
  position: absolute;
}
#title {
  white-space: nowrap;
  color: #ffffff;
  top: 13px;
  left: 80px;
}
#artist {
  top: 33px;
  left: 80px;
  font-size: 12px;
  font-weight: 100;
  color: #adadad;
}
#controls {
  margin-left: -10px;
  margin-top: 22px;
}
.play {
  position: absolute;
  top: 15px;
  left: 250px;
  cursor: pointer;
  z-index: 1;
}
#art {
  top: 10px;
  left: 10px;
  width: 60px;
  height: 60px;
  border-radius: 4px;
  background-size: cover;
  background-image: url("@/assets/suzume.jpg");
}

.reset {
  position: absolute;
  top: -20px;
  right: -320px;
  cursor: pointer;
  @media (max-width: 420px) {
    top: -20px;
    left: 260px;
    width: 25px;
    height: 25px;
  }
}

.pause {
  position: absolute;
  top: 15px;
  left: 250px;
  cursor: pointer;
  @media (max-width: 420px) {
    top: 20px;
  }
}

.moz-appearance {
  display: none;
}
</style>
