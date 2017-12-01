<template>
    <div>   
        <app-form></app-form>
        <footer>
            <div class="columns">
                <div class="column is-6" style="background-color: white;">
                    <div class="columns is-centered">
                        <div class="column is-3">
                            <p>Founding Sponsor</p>
                            <img src="https://parkpeople.ca/listings/custom/uploads/2017/09/TD-logo.png">
                        </div>
                    </div>
                </div>
                
                <div class="column is-6" style="background-color: green; color: white; padding: 40px;">
                    <div class="columns">
                        <div class="column is-6">
                            
                            <ul>
                                <li>Park People</li>
                                <li>401 Richmond Street West</li>
                                <li>Studio 119, City Builder’s Lab</li>
                                <li>Toronto, ON M5V 3A8</li>
                            </ul>
                            <ul>
                                <li>Phone: <a href="tel:+14165835776">416-583-5776</a></li>
                                <li>Email: <a href="mailto:info@parkpeople.ca">info@parkpeople.ca</a></li>
                                <li>Charity #846449437RR0001</li>
                            </ul>
                        </div>
                        <div class="column is-6">
                            <a class="button" href="https://parkpeople.ca/donate-now" target="_blank">Donate</a>
                        </div>

                    </div>
                </div>
            </div>
        </footer> 
    </div>
</template>

<script>
    import NewsletterForm from './NewsletterForm.vue';
    export default {
        components: {
            appForm: NewsletterForm
        }
    }
</script>

<style scoped>
    footer img {
        max-width: 150px;
        height: auto;
        padding-top: 40px;
    }

    .skewed-bg{
  	background: #ecebeb;
 	padding: 100px 0;
	transform: skew(0deg, -5deg);
  	margin-top: -120px;
	position: relative;
	z-index: -1;
}
</style>