<template>
    <nav>
        <v-app-bar color="black" dark app class="line">
            
            <v-toolbar-title  class="text-uppercase white--text">
                <span class="font-weight-light">E-</span>
                <span class="font-weight-bold">Commerce</span>

            </v-toolbar-title>
            <template>
                <v-btn color:black dark small absolute button right fab>
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
            
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" darkapp mini-variant class="red">
            <v-list flat>
                <v-list-item class="mb-12">
                    <v-list-item-action>
                        <v-icon>fas fa-cloud-download-alt</v-icon>
                    </v-list-item-action>

                </v-list-item>
<v-list-item router to="/">
<v-list-item-action>
    <v-icon>fas fa-desktop</v-icon>
    </v-list-item-action>
</v-list-item>
<v-list-item router to="/">
<v-list-item-action>
    <v-badge color="yellow">
        <template v-slot:badget>1</template>
        <v-icon>fas-fa-shopping-cart</v-icon>
     

        
        
        </v-badge>
        </v-list-item-action>
        </v-list-item>
            </v-list>

            
            </v-navigation-drawer>



    </nav>
</template>
<script>
export default {
    name:'mainpage'
}
</script>