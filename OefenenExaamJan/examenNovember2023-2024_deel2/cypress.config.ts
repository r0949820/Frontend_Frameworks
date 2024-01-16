import {defineConfig} from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
    e2e: {
        setupNodeEvents(on, _) {
            // implement node event listeners here
            on('file:preprocessor', vitePreprocessor())
        },
        baseUrl: 'http://localhost:5173',
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },

    env: {
        testEmail: 'cypressAccountLaurensThys@testing.com',
        testPassword: 'test123test',
        sessionName: 'cypress-account',
    },
})
