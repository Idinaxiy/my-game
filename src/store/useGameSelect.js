import {
    computed,
    nextTick
} from "vue";
import {
    DEFAULT_COUNT,
    FIELD,
    GAME_SPEED,
    GAME_STATUS,
    MAX_COUNT
} from "../const";

export default function useGameSelect(fields, gameStatus, count, init, start) {
    const selectField = (id) => {
        const index = fields.value.findIndex((field) => field.id === id);

        if (index > -1 && !fields.value[index].click) {
            fields.value[index].click = true;
            checkGame(index);
        }
    };

    const checkGame = (index) => {
        if (fields.value[index].value === FIELD.EMPTY) {
            setGameOver();
            return;
        }

        const notFoundItemIndex = fields.value.findIndex(field => {
            return !field.click && field.value === FIELD.FILLED;
        });

        if (notFoundItemIndex === -1) {
            setWin();
        }
    };

    const setGameOver = () => {
        gameStatus.value = GAME_STATUS.FAIL;
        count.value = DEFAULT_COUNT;

        setTimeout(() => {
            init();
            start();
        }, GAME_SPEED);
    };

    const setWin = () => {
        gameStatus.value = GAME_STATUS.WIN;

        setTimeout(async () => {
            count.value = Math.min(count.value + 1, MAX_COUNT);
            await nextTick();
            start();
        }, GAME_SPEED);
    };

    const isWin = computed(() => {
        return gameStatus.value === GAME_STATUS.WIN
    });

    const isFail = computed(() => {
        return gameStatus.value === GAME_STATUS.FAIL
    });

    return {
        selectField,
        checkGame,
        isWin,
        isFail
    };
}