package hu.szakdolgozat.btsz

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BtszApplication

fun main(args: Array<String>) {
    runApplication<BtszApplication>(*args)
}
