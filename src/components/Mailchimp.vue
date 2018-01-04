<template>
    <div class="mailchimp-form-container">
        <form action="https://parkpeople.us2.list-manage.com/subscribe/post" method="POST" noValidate target="_blank">
            <input type="hidden" name="u" value="ba963c8c64482c0ad756245c3"/>
            <input type="hidden" name="id" value="efc9b053b8"/>
            <label htmlFor='MERGE0'>
            Email
                <input 
                    type="email" 
                    name="EMAIL" 
                    id="MERGE0"
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
                    v-model="fNameValue"
                />
            </label>
            <label htmlFor='MERGE2'>
                Last name
                <input 
                    type="text" 
                    name="LNAME" 
                    id="MERGE2" 

                    v-model="lNameValue"
                />
            </label>
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_eb05e4f830c2a04be30171b01_8281a64779" tabindex="-1" value=""></div>
            <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
            <!-- <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/> -->
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

