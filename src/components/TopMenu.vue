<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="/">New Project</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item href="/people">People</b-nav-item>
                <b-nav-item href="/person">Add Person</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <template slot="button-content">
                      <em>User</em>
                    </template>
                    <b-dropdown-item href="/profile">Profile</b-dropdown-item>
                    <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>
<script>
    export default {
        name: 'TopMenu',
        methods: {
            signOut(){
				this.$http.post('/unauth')
				.then(() => {
					localStorage.clear();
                    this.$router.push('/');
				})
			},
        },
    };
</script>
