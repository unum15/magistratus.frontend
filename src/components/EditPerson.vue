<template>
    <div>
        <TopMenu></TopMenu>
        <h1>
            {{ person.name }}
        </h1>
        <main>
            <b-container fluid="md">
                <b-form-row>
                    <b-col md="6">
                        <b-form-group label="Name" label-cols="4" label-align="right">
                            <b-form-input
                                v-model="person.name"
                                @change="save"
                                type="text"
                                :state="person.name != null"
                                required
                            >
                            </b-form-input>
                        
                        </b-form-group>
                    </b-col>
                </b-form-row>

                <b-form-row>
                    <b-col md="6">
                        <b-form-group label="Hire Date" label-cols="4" label-align="right">
                            <b-form-input
                                v-model="person.hire_date"
                                @change="save"
                                type="date"
                                :state="person.hire_date != null"
                                required
                            >
                            </b-form-input>
                        
                        </b-form-group>
                    </b-col>
                </b-form-row>

                <b-form-row>
                    <b-col>
                        <b-button @click="$router.push('/people')">Done</b-button>
                    </b-col>
                </b-form-row>
            </b-container>
        </main>
    </div>
</template>
<script>
import TopMenu from './TopMenu'
export default {
    name: 'EditPerson',
    components: {
        'TopMenu': TopMenu
    },
    props: {
        person_id: {default: null}
    },
    data () {
        return {
            person: { id: null },
        };
    },
    created () {
        if(this.person_id !== null) {
            this.$http.get('/person/' + this.person_id).then(response => {
                this.person = response.data.data;
            });
        }
    },
    methods: {
        save () {
            if((!this.person.name)||(!this.person.hire_date)){
                return;
            }
            if(this.person.id === null){
                this.$http.post('/person',this.person)
                    .then((results) => {
                        this.person.id = results.data.data.id;
                    });
            }
            else{
                this.$http.patch('/person/' + this.person.id, this.person);
            }
        }
    }
};
</script>

