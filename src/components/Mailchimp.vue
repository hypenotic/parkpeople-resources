<template>
    <div class="mailchimp-form-container">
        <form action="https://parkpeople.us2.list-manage.com/subscribe/post" method="POST" noValidate>
            <input type="hidden" name="u" value="ba963c8c64482c0ad756245c3"/>
            <input type="hidden" name="id" value="efc9b053b8"/>
            <label htmlFor='MERGE0'>
            Email
                <input 
                    type="email" 
                    name="EMAIL" 
                    id="MERGE0"
                    v-bind:value="emailValue"
                    v-model="emailValue"
                    autoCapitalize="off" 
                    autoCorrect="off"
                    /> 
            </label>
            <label htmlFor='MERGE1'>
                First name
                <input 
                    type="text" 
                    name="FNAME" 
                    id="MERGE1" 
                    v-bind:value="fNameValue"
                    v-model="fNameValue"
                />
            </label>
            <label htmlFor='MERGE2'>
                Last name
                <input 
                    type="text" 
                    name="LNAME" 
                    id="MERGE2" 
                    v-bind:value="lNameValue"
                    v-model="lNameValue"
                />
            </label>
            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			emailValue: '',
            fNameValue: '',
            lNameValue: '',
		};
	},
	computed:{
    
    },
	methods: {

	},
	mounted() {

	},
	created() {
	
	},
};
</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';

</style>

