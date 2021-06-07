/*
 * Arduino to Max - June 2021, Atsushi Yamazaki
 * 
 * Send serial data from connected sensors on Arduino to my Max patch
 * Reference:
 * https://deviceplus.jp/hobby/entry016/
 * http://www.musashinodenpa.com/arduino/ref/index.php?f=2&pos=270
*/

#include <stdio.h>
#include <stdlib.h>

#define echoPin 2 // Echo
#define trigPin 3 // Trigger

float duration = 0;
float distance = 0;

void setup() {
  Serial.begin(115200);
  pinMode(echoPin, INPUT);
  pinMode(trigPin, OUTPUT);
}


void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration / 2) * 0.0344; // Simple measurement

  // Convert the distance to the MIDI number
  int dist = round(distance * 100);
  int midiNum = 0;
  
  if (dist <= 300) {
    dist = 300;
  } else if (dist >= 4500) {
    dist = 4500;
  }

  midiNum = map(dist, 300, 4500, 23, 112);
  Serial.println(midiNum);
  
  /*
  Serial.print("Distance: ");
  if (distance > 400 || distance < 2) {
    Serial.println("Out of range");
  } else {
    Serial.print(distance);
    Serial.println(" cm");
  }
  */

  delay(100);
}
