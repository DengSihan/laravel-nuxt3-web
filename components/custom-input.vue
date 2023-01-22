<style lang="scss">
	
	.custom-input {
		@apply relative my-4;

		input {
			@apply border border-2 pt-3 pb-2 px-3 w-full block rounded placeholder-transparent outline-none;

			&:focus {
				@apply border-blue-600;

				& + label {
					@apply text-blue-600;
				}
			}

			&:focus + label,
			&:not(:placeholder-shown) + label {
				@apply scale-[75%] -translate-y-2;
			}
		}

		label {
			@apply bg-white px-2 text-base absolute z-10 left-2 translate-y-3 cursor-text top-0 transition-[transform,text-color] duration-75 origin-[center_left];
		}

		p {
			@apply text-xs my-1 list-none;

			span {
				@apply list-item;
			}
		}

		&.has-errors {
			input {
				@apply text-red-600 border-red-600;
			}

			label {
				@apply text-red-600;
			}
		}
	}

</style>

<template>

    <fieldset
        class="custom-input"
        :class="{
            'has-errors': hasErrors
        }"
        v-bind="attrsClassStyleOnly">

        <input
			:id="`${name}-input`"
            :name="name"
			:aria-describedby="inputIsDescribedBy"
            :placeholder="placeholder"
			v-model="computedValue"
			v-bind="attrsWithoutClassStyle">

        <label
			:for="`${name}-input`"
			v-html="placeholder"/>

		<p
			v-if="hasTips && !hasErrors"
			class="text-slate-600"
			:id="`${name}-tips`">
			<span
				v-for="tip in tips"
				v-html="tip"/>
		</p>

		<p
			v-if="hasErrors"
			class="text-red-600"
			role="alert"
			:id="`${name}-errors`">
			<span
				v-for="error in errors"
				v-html="error"/>
		</p>

    </fieldset>

</template>

<script setup>
import { omit, pick } from 'lodash';
import { useAttrs } from 'vue';

const props = defineProps({
    modelValue: {
        required: true,
    },
    errors: {
        type: Array,
        default: () => [],
    },
    name: {
        type: String,
        required: true,
    },
    tips: {
        type: Array,
        default: () => [],
    },
    placeholder: {
        type: String,
        required: true,
    },
});

const emits = defineEmits([
    'update:modelValue',
    'update:errors',
]);

const computedValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
		emits('update:errors', []);
        emits('update:modelValue', value);
    },
});

const hasErrors = computed(() => {
    return props.errors.length > 0;
});

const hasTips = computed(() => {
    return props.tips.length > 0;
});

const inputIsDescribedBy = computed(() => {
    return [
            hasTips
                ? `${props.name}-tips`
                : null,
            hasErrors
                ? `${props.name}-errors`
                : null
        ]
        .filter(i => i)
        .join(' ');
});

const attrs = useAttrs();

const attrsClassStyleOnly = computed(() => {
    return pick(attrs, ['class', 'style']);
});

const attrsWithoutClassStyle = computed(() => {
    return omit(attrs, ['class', 'style']);
});


</script>

<script>
export default {

    name: 'custom-input',

    inheritAttrs: false,

}
</script>