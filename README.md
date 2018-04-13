#POC

In Order to call the socket from C++ we can use this code

#include<iostream>
#include<arpa/inet.h>
#include<unistd.h>
#include<sys/socket.h>
#include<sys/types.h>
#include<stdio.h>
#include<string.h>
#include<stdlib.h>

 int sockfd;
 sockfd = socket(AF_INET,SOCK_DGRAM,0);
 struct sockaddr_in serv,client;
 
 serv.sin_family = AF_INET;
 serv.sin_port = htons(666);
 serv.sin_addr.s_addr = inet_addr("192.168.56.1");

char buffer[512];
sprintf(buffer, "Hola Mundo");   //Send Hola Mundo as a message

 socklen_t l = sizeof(client);
 socklen_t m = sizeof(serv);
  printf("\nSend the UDP Message\n");
 sendto(sockfd,buffer,sizeof(buffer),0,(struct sockaddr *)&serv,m);
 
