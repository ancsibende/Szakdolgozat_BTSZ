package hu.szakdolgozat.btsz.config

import hu.szakdolgozat.btsz.jwt.JwtConfigurer
import hu.szakdolgozat.btsz.service.JwtTokenProvider
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import org.springframework.web.servlet.config.annotation.CorsRegistry

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@EnableWebSecurity
@Configuration
class SecurityConfig(
    private val jwtTokenProvider: JwtTokenProvider,
) {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.authorizeHttpRequests {
            it.requestMatchers(
                AntPathRequestMatcher.antMatcher("/"),
                AntPathRequestMatcher.antMatcher("/error"),
                AntPathRequestMatcher.antMatcher("/api/**")
            ).permitAll()

            it.requestMatchers(
                AntPathRequestMatcher.antMatcher("/api/users"),
                AntPathRequestMatcher.antMatcher("/api/news/add"),
                AntPathRequestMatcher.antMatcher("/api/addevent")
            ).hasAnyRole("admin")

        }

        http.sessionManagement { session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        }
        http.formLogin { it.disable() }
        http.apply(JwtConfigurer(jwtTokenProvider))
        http.exceptionHandling { it.accessDeniedPage("/403") }
        http.csrf {
            it.ignoringRequestMatchers(
                AntPathRequestMatcher.antMatcher("/api/**")

            )
        }
        return http.build()
    }

    @Bean
    fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry
                    .addMapping("/**")
                    .allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
            }
        }
    }

}