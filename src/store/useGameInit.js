import {
    ref,
    onBeforeMount,
    watch
} from "vue";
import {
    FIELD,
    DEFAULT_COUNT,
    MAX_COUNT
} from "../const";

export default function useGameInit(nums) {
    const count = ref(DEFAULT_COUNT);
    const fields = ref([]);

    const init = () => {
        fields.value = [];

        for (let i = 0; i < nums; i++) {
            fields.value.push({
                id: i,
                click: false,
                value: FIELD.EMPTY,
            });
        }
    };

    watch(count, (newCount) => {
        if (newCount > MAX_COUNT) {
            count.value = MAX_COUNT;
        }
    });

    onBeforeMount(init);

    return {
        count,
        fields,
        init,
    };
}