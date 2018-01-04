<template>
    <section class="section">
        <div class="container ">
            <div class="mailchimp-form-container">
                <form action="https://parkpeople.us2.list-manage.com/subscribe/post" method="POST" noValidate target="_blank">
                    <input type="hidden" name="u" value="ba963c8c64482c0ad756245c3"/>
                    <input type="hidden" name="id" value="efc9b053b8"/>
                    <label htmlFor='MERGE0'></label>
                    <input 
                        type="email" 
                        name="EMAIL" 
                        id="MERGE0"
                        v-model="emailValue"
                        autoCapitalize="off" 
                        autoCorrect="off"
                        placeholder="Your email here"
                        /> 
                    <input type="submit" value="Okay!" name="subscribe" id="mc-embedded-subscribe" class="button"/>
                    <!-- <label htmlFor='MERGE1'>
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
                    </label> -->
                    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_eb05e4f830c2a04be30171b01_8281a64779" tabindex="-1" value=""></div>
                    
                    <!-- <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/> -->
                </form>
            </div>        
        </div>
    </section>
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

.section {
    background-color: #fff;
    padding: 0;
}

.container {
    max-width: 800px;
    margin: 0 auto;
}


</style>

