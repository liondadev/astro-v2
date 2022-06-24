FROM python:3-alpine

# Install docker because we need to fucking hell i hate dokr
RUN apk add --update docker openrc
RUN rc-update add docker boot

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "./src/main.py" ]
