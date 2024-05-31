import {
    ref,
    computed
} from "vue";
import {
    FIELD,
    GAME_STATUS,
    GAME_SPEED
} from "../const";

export default function useGameStart(init, fields, count, nums, gameStatus) {
    const start = () => {
        init();
        prepareGame();
    };

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const prepareGame = () => {
        gameStatus.value = GAME_STATUS.PREVIEW;

        for (let i = 0; i < count.value; i++) {
            const index = random(0, nums);

            if (fields.value[index].value !== FIELD.FILLED) {
                fields.value[index].value = FIELD.FILLED;
            } else {
                i--;
            }
        }
        setTimeout(() => {
            gameStatus.value = GAME_STATUS.STARTED;
        }, GAME_SPEED);
    };

    const canStartGame = computed(() => {
        return gameStatus.value !== GAME_STATUS.PREVIEW && gameStatus.value !== GAME_STATUS.WIN;
    });

    return {
        start,
        canStartGame,
    };
}