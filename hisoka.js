/**
#CREDITS NYA JANGAN DIHAPUS TOD!!

✎CREDITS
 Dika Ardnt. (Base Ori)
 Zeonee
 Rasyhid
 Xfar-Dev

Source Kode Disini:
https://github.com/DikaArdnt/Hisoka-Morou
*/

require('./config')
const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const { fromBuffer } = require('file-type')
const path = require('path')
const os = require('os')
const request = require('request')
const speed = require('performance-now')
const hx = require('hxz-api')
const xfar = require('xfarr-api');
const yts = require( 'yt-search')
const { performance } = require('perf_hooks')
const { pinterest, wallpapercave, wallpaper, wallpaperhd, wikimedia, porno, hentai, quotesAnime } = require('./lib/scraper')
const { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader')
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require('./lib/myfunc')
const { wikiSearch } = require('./lib/wiki')
const { fbdl } = require("./lib/fbdl")
const { yta, ytv } = require('./lib/ytdl')
const { y2mateA, y2mateV } = require('./lib/y2mate')
const database = require('./database.json')
const simbol = '•'
const ownerNumber = global.owner
const ownername = global.ownername


module.exports = hisoka = async (hisoka, m, chatUpdate) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? m.message.buttonsResponseMessage.selectedButtonId : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()        
        const isGroup = m.key.remoteJid.endsWith('@g.us')
        const sender = isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const isCreator = [hisoka.user.id, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == hisoka.user.id ? true : false
        const isOwner = ownerNumber.includes(m.sender)
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
	    const isMedia = /image|video|sticker|audio/.test(mime)
	
        // Group
        const groupMetadata = m.isGroup ? await hisoka.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
     	const isBotAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false

        // Bot Status
        const used = process.memoryUsage()
        const cpus = os.cpus().map(cpu => {
            cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
			return cpu
        })
        const cpu = cpus.reduce((last, cpu, _, { length }) => {
            last.total += cpu.total
			last.speed += cpu.speed / length
			last.times.user += cpu.times.user
			last.times.nice += cpu.times.nice
			last.times.sys += cpu.times.sys
			last.times.idle += cpu.times.idle
			last.times.irq += cpu.times.irq
			return last
        }, {
            speed: 0,
			total: 0,
			times: {
			    user: 0,
			    nice: 0,
			    sys: 0,
			    idle: 0,
			    irq: 0
            }
        })

        // Public & Self
        if (!hisoka.public) {
            if (!m.key.fromMe) return 
        }

        // Push Message To Console
        if (m.message) {
            console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
        }
        
        //SendMessage
        const sendMess = (from, teks) => {
             return hisoka.sendMessage(from, { text: teks })
        }
        //SendMediaUrl
            const sendFileFromUrl = async (from, url, caption, msg, men) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return hisoka.sendMessage(m.chat, { video: await convertGif(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: m})
                }
            let type = mime.split("/")[0]+"Message"
            if(mime.split("/")[0] === "image"){
                return hisoka.sendMessage(m.chat, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: m})
            } else if(mime.split("/")[0] === "video"){
                return hisoka.sendMessage(m.chat, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: m})
            } else if(mime.split("/")[0] === "audio"){
                return hisoka.sendMessage(m.chat, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio/mpeg'}, {quoted: m })
            } else {l
                return hisoka.sendMessage(m.chat, { document: await getBuffer(url), mimetype: mime, caption: caption, mentions: men ? men : []}, {quoted: m })
            }
        }
               


        //CopasChikaBot
        hisoka.sendReadReceipt(m.chat, sender, [m.key.id])        
        
        
        switch(command) {
	    case 'sc': {
                m.reply('*Bot Ini Menggunakan Script Dari* : https://github.com/DikaArdnt/Hisoka-Morou')
            }
            break
            case 'chat': {
                if (!isCreator && !m.key.fromMe) throw mess.owner
                if (!q) throw 'Option : 1. mute\n2. unmute\n3. archive\n4. unarchive\n5. read\n6. unread\n7. delete'
                if (args[0] === 'mute') {
                    hisoka.chatModify({ mute: 'Infinity' }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                } else if (args[0] === 'unmute') {
                    hisoka.chatModify({ mute: null }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                } else if (args[0] === 'archive') {
                    hisoka.chatModify({  archive: true }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                } else if (args[0] === 'unarchive') {
                    hisoka.chatModify({ archive: false }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                } else if (args[0] === 'read') {
                    hisoka.chatModify({ markRead: true }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                } else if (args[0] === 'unread') {
                    hisoka.chatModify({ markRead: false }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                } else if (args[0] === 'delete') {
                    hisoka.chatModify({ clear: { message: { id: m.quoted.id, fromMe: true }} }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                }
            }
            break
            case 'join': {
                if (!isCreator && !m.key.fromMe) throw mess.owner
                if (!text) throw 'Masukkan Link Group!'
                if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
                m.reply(mess.wait)
                let result = args[0].split('https://chat.whatsapp.com/')[1]
                await hisoka.groupAcceptInvite(result).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }
            break
case 'revoke':
                if (!m.isGroup) throw mess.group
             if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
                if (!isGroupAdmins && !m.key.fromMe) throw mess.admin                                               
                let link = await hisoka.groupRevokeInvite(m.chat)
                await m.reply( `*New Link for ${groupName}* :\n https://chat.whatsapp.com/${link}`)
            break

            case 'leave': {
                if (!isCreator && !m.key.fromMe) throw mess.owner
                await hisoka.groupLeave(m.chat).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }
            break
	case 'kick': {
		if (!m.isGroup) throw mess.group
                if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
                if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await hisoka.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	}
	break
	case 'add': {
		if (!m.isGroup) throw mess.group
                if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
                if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
		let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await hisoka.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	}
	break
	case 'promote': {
		if (!m.isGroup) throw mess.group
                if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
                if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await hisoka.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	}
	break
	case 'demote': {
		if (!m.isGroup) throw mess.group
                if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
                if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await hisoka.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	}
	break
        case 'block': {
		if (!isCreator && !m.key.fromMe) throw mess.owner
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await hisoka.updateBlockStatus(users, 'block').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	}
	break
        case 'unblock': {
		if (!isCreator && !m.key.fromMe) throw mess.owner
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await hisoka.updateBlockStatus(users, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	}
	break
	    case 'setname': case 'setsubject': {
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
                if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
                if (!text) throw 'Text ?'
                await hisoka.groupUpdateSubject(m.chat, text).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }
            break
            case 'setprofile': case 'setpp': {
                if (!isCreator && !m.key.fromMe) throw mess.owner
                if (!quoted) throw 'Reply Image'
                if (/image/.test(mime)) throw `balas image dengan caption *${prefix + command}*`
                let media = await hisoka.downloadAndSaveMediaMessage(quoted)
                if (!m.isGroup && !isBotAdmins && !isGroupAdmins) {
                    await hisoka.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
		    await fs.unlinkSync(media)
                } else if (!isCreator && !m.key.fromMe) {
                    await hisoka.updateProfilePicture(hisoka.user.id, { url: media }).catch((err) => fs.unlinkSync(media))
		    await fs.unlinkSync(media)
                }
            }
            break
            case 'group': case 'grup': {
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
                if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
                if (!text) throw 'Masukkan value open/close'
                if (args[0].toLowerCase() === 'close') {
                    await hisoka.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                } else if (args[0].toLowerCase() === 'open') {
                    await hisoka.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                }
            }
            break

            case 'linkgroup': case 'linkgc': {
                if (!m.isGroup) throw mess.group
                let response = await hisoka.groupInviteCode(m.chat)
                hisoka.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
            }
            break
            case 'ephemeral': {
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
                if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
                if (!text) throw 'Masukkan value enable/disable'
                if (args[0] === 'enable') {
                    await hisoka.sendMessage(m.chat, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL }).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                } else if (args[0] === 'disable') {
                    await hisoka.sendMessage(m.chat, { disappearingMessagesInChat: false }).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                }
            }
            break
case 'hidetag':
			if (!m.isGroup) throw mess.group
			 if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
			var group = await hisoka.groupMetadata(m.chat)
			var member = group['participants']
			var mem = []
			member.map(async adm => {
			mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
			})
			var optionshidetag = {
			text: q,
			contextInfo: { mentionedJid: mem },
			quoted: m
			}
			hisoka.sendMessage(m.chat, optionshidetag, text)
			break
case 'tagall': case 'infoall':
                if (!m.isGroup) throw mess.group
                if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
                let startnum = 1
                let teks = `*_Tag All Member_*\n*Pesan : ${q ? q : '-'}*\n\n`
		      	for (let mem of groupMembers) {
		            teks += `${startnum++}. @${mem.id.split('@')[0]}\n`
				}
                teks += `\n⋙ *SHIRO* ⋘`
                hisoka.sendMessage(m.chat, { text: teks, mentions: groupMembers.map(a => a.id) }, { quoted: m })
            break
            case 'delete': case 'del': {
                if (!m.quoted) throw false
                let { chat, fromMe, id, isBaileys } = m.quoted
                if (!isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
                hisoka.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
            }
            break
	    case 'sticker': case 's': case 'stickergif': case 'sgif': {
		if (!quoted) throw `Balas Video/Image Dengan Caption ${prefix + command}`
		m.reply(mess.wait)
                if (/image/.test(mime)) {
		    let media = await quoted.download()
		    let encmedia = await hisoka.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
		    await fs.unlinkSync(encmedia)
		} else if (/video/.test(mime)) {
		    if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
		    let media = await quoted.download()
		    let encmedia = await hisoka.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
		    await fs.unlinkSync(encmedia)
		} else {
            	    throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
        	}
	    }
	    break

	    case 'toimage': case 'toimg': {
                if (!quoted) throw 'Reply Image'
                if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
                m.reply(mess.wait)
                let media = await hisoka.downloadAndSaveMediaMessage(quoted)
                let ran = await getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) throw err
                    let buffer = fs.readFileSync(ran)
                    hisoka.sendMessage(m.chat, { image: buffer }, { quoted: m })
                    fs.unlinkSync(ran)
                })
            }
            break
	    case 'tomp4': case 'tovideo': {
                if (!quoted) throw 'Reply Image'
                if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
                m.reply(mess.wait)
                let media = await hisoka.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
                await hisoka.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
                await fs.unlinkSync(media)
            }
            break
            case 'togif': {
                if (!quoted) throw 'Reply Image'
                if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
                m.reply(mess.wait)
                let media = await hisoka.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
                await hisoka.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
                await fs.unlinkSync(media)
            }
            break
	    case 'tourl': {
                m.reply(mess.wait)
                let media = await hisoka.downloadAndSaveMediaMessage(quoted)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    m.reply(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    m.reply(util.format(anu))
                }
                await fs.unlinkSync(media)
            }
            break
            case 'pinterest': {
                m.reply(mess.wait)
                anu = await pinterest(text)
                result = anu[Math.floor(Math.random(), anu.length)]
                hisoka.sendMessage(m.chat, { image: { url: result }, caption: '⭔ Media Url : '+result }, { quoted: m })
            }
            break 
                    
            case 'wallpaper': {
                m.reply(mess.wait)
                anu = await wallpaperhd(text)
               result = anu[Math.floor(Math.random(), anu.length)]
                hisoka.sendMessage(m.chat, { image: { url: result }}, { quoted: m })
            }
            break

           case 'wikimedia':
if (!text) return m.reply(' Yang Mau Di Cari Apa? ')
res = await wikiSearch(q).catch(e => {
return m.reply('_[ ! ] Error Hasil Tidak Ditemukan_') 
}) 
result = `*Judul :* ${res[0].judul}
*Wiki :* ${res[0].wiki}`,
sendFileFromUrl(m.chat,res[0].thumb,result,m).catch(e => {
})
break
            case 'porno': case 'porn': case 'bokep': {
                m.reply(mess.wait)
                anu = await porno()
                hisoka.sendMessage(m.chat, { video: { url: 'https://tikporntok.com/'+anu.video }, caption: `⭔ Title : ${anu.title}\n⭔ Viewers : ${anu.views}\n⭔ Tags : ${anu.tags}\n⭔ Likes : ${anu.like}\n⭔ Dislikes : ${anu.dislike}\n⭔ Favourite : ${anu.favorite}\n⭔ Time Upload : ${anu.upload}\n⭔ Description : ${anu.desc}\n⭔ Source : https://tikporntok.com/${anu.source}` }, { quoted: m })
            }
            break
            case 'hentai': {
                m.reply(mess.wait)
                anu = await hentai()
                result = anu[Math.floor(Math.random(), anu.length)]
                hisoka.sendMessage(m.chat, { video: { url: result.video_1 }, caption: `⭔ Title : ${result.title}\n⭔ Category : ${result.category}\n⭔ Mimetype : ${result.type}\n⭔ Views : ${result.views_count}\n⭔ Shares : ${result.share_count}\n⭔ Source : ${result.link}\n⭔ Media Url : ${result.video_1}` }, { quoted: m })
            }
            break

case 'anime':
                if (!q) throw 'Mo Cari Anime Apa Suk?'
                await m.reply(mess.wait)
                xfar.Anime(q).then(async data => {
                    let txt = `*-------「 ANIME-SEARCH 」-------*\n\n`
                    for (let i of data) {
                        txt += `*📫 Title :* ${i.judul}\n`
                        txt += `*📚 Url :* ${i.link}\n-----------------------------------------------------\n`
                    }
                    await sendFileFromUrl(m.chat,data[0].thumbnail,txt,m)
                })
                .catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command} Error: \n\n` + err)
                    }
                    m.reply('error')
                })
            break
  
            case 'quotesanime': case 'quoteanime': {
                anu = await quotesAnime()
                result = anu[Math.floor(Math.random(), anu.length)]
		let buttons = [
                    {buttonId: `quotesanime`, buttonText: {displayText: 'Next'}, type: 1}
                ]
                let buttonMessage = {
                    text: `~_${result.quotes}_\n\nBy '${result.karakter}', ${result.anime}\n\n- ${result.up_at}`,
                    footerText: 'Press The Button Below',
                    buttons: buttons,
                    headerType: 2
                }
                hisoka.sendMessage(m.chat, buttonMessage, { quoted: m })
            }
            break
	    case 'motivasi': case 'dilanquote': case 'bucinquote': case 'katasenja': case 'puisi': {
                let anu = await fetchJson(api('zenz', '/api/'+command, {}, 'apikey'))
                let buttons = [
                    {buttonId: `motivasi`, buttonText: {displayText: 'Next'}, type: 1}
                ]
                let buttonMessage = {
                    text: anu.result.message,
                    footerText: 'Press The Button Below',
                    buttons: buttons,
                    headerType: 2
                }
                hisoka.sendMessage(m.chat, buttonMessage, { quoted: m })
            }
            break 
            case 'tiktoknowm':
if (!text) throw 'Masukkan Query Link!'
var { TiktokDownloader } = require('./lib/tiktokdl')
m.reply(mess.wait)
res = await TiktokDownloader(`${q}`).catch(e => {
})
console.log(res) 
let buttons = [
                    {buttonId: `tiktokwm ${text}`, buttonText: {displayText: '► With Watermark'}, type: 1},
                    {buttonId: `tiktokmp3 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: res.result.nowatermark },
                    caption: `Press The Button Select Download`,
                    footerText: 'Press The Button Below',
                    buttons: buttons,
                    headerType: 5
                }
                hisoka.sendMessage(m.chat, buttonMessage, { quoted: m })
            
            break

case 'tiktokwm':
if (!text) return m.reply('Linknya?')
var { TiktokDownloader } = require('./lib/tiktokdl')
m.reply(mess.wait)
res = await TiktokDownloader(`${q}`).catch(e => {
//reply(mess.error.api)
})
console.log(res)
let buttons1 = [
                    {buttonId: `tiktoknowm ${text}`, buttonText: {displayText: '► No With Watermark'}, type: 1},
                    {buttonId: `tiktokmp3 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1}
                ]
                let buttonMessage1 = {
                    video: { url: res.result.watermark },
                    caption: `Press The Button Select Download`,
                    footerText: 'Press The Button Below',
                    buttons: buttons1,
                    headerType: 5
                }
                hisoka.sendMessage(m.chat, buttonMessage1, { quoted: m })
            
            break


            case 'tiktokmp3': case 'tiktokaudio': {
                if (!text) throw 'Masukkan Query Link!'
                m.reply(mess.wait)
                let anu = await fetchJson(api('zenz', '/api/downloader/tiktok', { url: text }, 'apikey'))
                let buttons2 = [
                    {buttonId: `tiktoknowm ${text}`, buttonText: {displayText: '► No Watermark'}, type: 1},
                    {buttonId: `tiktokwm ${text}`, buttonText: {displayText: '► With Watermark'}, type: 1}
                ]
                let buttonMessage2 = {
                    text: `Download From ${text}`,
                    footerText: 'Press The Button Below',
                    buttons: buttons2,
                    headerType: 2
                }
                let msg = await hisoka.sendMessage(m.chat, buttonMessage2, { quoted: m })
                hisoka.sendMessage(m.chat, { audio: { url: anu.result.audio } }, { quoted: msg })
            }
            break

case 'ts':
let ted = `y`
const menulist = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                "listMessage" :{
                    "title": `@${m.sender.split('@')[0]}`,
                    "description": "*NOTE*: _DO NOT SPAM_",
                    "buttonText": "CLICK HERE",
                    "footerText": "",
                    "listType": "SINGLE_SELECT",
                    "sections": [{
                    "footerText": "oi",
                      "title": "OPA",
                      "rows": [{
                          "title": "menu",
                          "rowId": `menu`,
                          "description": "TES"
                        },{
                          "title": "second",
                          "rowId": "ytmp3",
                          "description": ""
                        },{
                          "title": "another one",
                          "rowId": "2",
                          "description": ""
                        }]
                    }]
                }
            }), {mentionedJid: [m.sender],quoted:m})
            await hisoka.relayMessage(m.chat, menulist.message,{ messageId: menulist.key.id, waitForAck: false }); 
break

case 'igstory': case 'instagramstory':
            if(!text) throw m.reply('Usernamenya?')
            hx.igstory(text)
            .then(async result => {
            for(let i of result.medias){
                if(i.url.includes('mp4')){                                   
                    sendFileFromUrl(m.chat,i.url, i.type, m)                 
                }
            }
            });
            break


case 'ytplay':            
           if (!text) throw ('Judul??')
            let teks1 = args.join(' ')
            m.reply(mess.wait)
            let yut = await yts(teks1)
            res = await y2mateV(`${yut.videos[0].url}`).catch(e => {
            m.reply('_[ ! ] Error Gagal Dalam Memasuki Web Y2mate_')
})
            result = `
*_STATUS :_* *YOUTUBE PLAY*

*_Data Status!_*
*•Title : ${res[0].judul}*
*•Ext : YOUTUBE PLAY*

*_Presss Select Enter Button_*`
ya = await getBuffer(res[0].thumb) 
                const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    templateMessage: {
                        hydratedTemplate: {
                            locationMessage: { 
                           degreesLatitude: 0,
						   degreesLongitude: 0, 
						   jpegThumbnail: ya,
						   },
                            hydratedContentText: `${result}`,
                            hydratedFooterText: `Beta Version : 1.1.0`,
                            hydratedButtons: [{
                                urlButton: {
                                    displayText: 'View On YouTube',
                                    url: `${yut.videos[0].url}`
                                }
                            }, {
                                callButton: {
                                    displayText: 'Number Phone Owner',
                                    phoneNumber: '+62 882-9202-4190'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: '⪼VIDEO',
                                    id: `ytmp4 ${yut.videos[0].url}`
                                }                            
                            }, {
                                quickReplyButton: {
                                    displayText: '⪼AUDIO',
                                    id: `ytmp3 ${yut.videos[0].url}`
                                }
                            }]
                        }
                    }
                }), { userJid: m.chat, quoted: m })
                hisoka.relayMessage(m.chat, template.message, { messageId: template.key.id })                      
            break
 case 'yts':
       case 'ytsearch':
              if (!q) return reply(mess.wrongFormat)
              m.reply(mess.wait)
              try {
              res = await yts(q)
              a = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE SEARCH*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Data Berhasil Didapatkan!*\n`
for (let i of res.all) {
a += `\`\`\`き⃟🦈 Title : ${i.title}\`\`\`
\`\`\`き⃟🦈 Views : ${i.views}\`\`\`
\`\`\`き⃟🦈 Upload : ${i.ago}\`\`\`
\`\`\`き⃟🦈 Durasi : ${i.timestamp}\`\`\`
\`\`\`き⃟🦈 Channel : ${i.author.name}\`\`\`
\`\`\`き⃟🦈 Link : ${i.url}\`\`\``
}
               b = a.trim()
               hisoka.sendMessage(m.chat, { image: { url: res.all[0].image }, caption: b }, { quoted: m })
          ///   sendFileFromUrl(res.all[0].image, image, {quoted: mek, caption: b})
               } catch (e) {
               console.log(e)
               m.reply(`${e}`)
}
               break

    case 'ytmp3':            
            if (!text) throw ('Link Nya Mana?')
          if(!isUrl(args[0]) && !args[0].includes('youtu')) return m.reply('error link')
           let teks12 = args.join(' ')
            m.reply(mess.wait)
            res = await y2mateA(teks12).catch(e => {
            m.reply('_[ ! ] Error Gagal Dalam Memasuki Web Y2mate_')
})
            result = `
*_STATUS :_* *YOUTUBE MP3*

*_Data Status!_*
*•Title : ${res[0].judul}*
*•Quality : ${res[0].quality}*
*•Ext : MP3*
*•Size : ${res[0].size}*

*_Wait Minute Audio Is Sending_*`
          hisoka.sendMessage(m.chat, { image: { url: res[0].thumb }, caption: result }, { quoted: m }).then((lalu) => {
            sendFileFromUrl(m.chat, res[0].link, {quoted: m, mimetype: 'audio/mp3', filename: res[0].output})
})
            break
case 'ytmp4':           
            if (!text) throw ('Link Nya Mana?')
            if(!isUrl(args[0]) && !args[0].includes('youtu')) return m.reply('error link')
       //   let teks = args.join(' ')
            m.reply(mess.wait)
            res = await y2mateV(q).catch(e => {
            m.reply('_[ ! ] Error Gagal Dalam Memasuki Web Y2mate_')
})
            result = `
*_STATUS :_* *YOUTUBE MP4*

*_Data Status!_*
*•Title : ${res[0].judul}*
*•Ext : MP4*
*•Size : ${res[0].size}*

*_Wait Minute Video Is Sending_*`
          hisoka.sendMessage(m.chat, { image: { url: res[0].thumb }, caption: result }, { quoted: m }).then((lalu) => {
      hisoka.sendMessage(m.chat, { video: { url: res[0].link }, caption: `*_SUKSES SEND VIDEO_*`}, { quoted: m })
})
            break

case 'igdl': case 'instagram':
if (!text) return m.reply('Linknya?')
m.reply(mess.wait)
var { igDownloader } = require('./lib/igdown')
   res = await igDownloader(`${q}`).catch(e => {
})
console.log(res)
sendFileFromUrl(m.chat,res.result.link,res.result.desc,m)
                    break

	    case 'twitdl': case 'twitter': {
                if (!text) throw 'Masukkan Query Link!'
                m.reply(mess.wait)
                let anu = await fetchJson(api('zenz', '/api/downloader/twitter', { url: text }, 'apikey'))
                let buttons = [
                    {buttonId: `twittermp3 ${text}`, buttonText: {displayText: '► Audio'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: anu.result.HD || anu.result.SD },
                    caption: util.format(anu.result),
                    footerText: 'Press The Button Below',
                    buttons: buttons,
                    headerType: 5
                }
                hisoka.sendMessage(m.chat, buttonMessage, { quoted: m })
            }
            break
            case 'twittermp3': case 'twitteraudio': {
                if (!text) throw 'Masukkan Query Link!'
                m.reply(mess.wait)
                let anu = await fetchJson(api('zenz', '/api/downloader/twitter', { url: text }, 'apikey'))
                let buttons = [
                    {buttonId: `twitter ${text}`, buttonText: {displayText: '► Video'}, type: 1}
                ]
                let buttonMessage = {
		    image: { url: anu.result.thumb },
                    caption: util.format(anu.result),
                    footerText: 'Press The Button Below',
                    buttons: buttons,
                    headerType: 4
                }
                let msg = await hisoka.sendMessage(m.chat, buttonMessage, { quoted: m })
                hisoka.sendMessage(m.chat, { audio: { url: anu.result.audio } }, { quoted: msg })
            }
            break

	    case 'fbdl': case 'fb': case 'facebook': {
                if (!text) throw 'Masukkan Query Link!'
                m.reply(mess.wait)
                let anu = await fetchJson(api('zenz', '/api/downloader/facebook', { url: text }, 'apikey'))
                hisoka.sendMessage(m.chat, { video: { url: anu.result.url }, caption: `⭔ Title : ${anu.result.title}`}, { quoted: m })
            }
            break
	    case 'pindl': case 'pinterestdl': {
                if (!text) throw 'Masukkan Query Link!'
                m.reply(mess.wait)
                let anu = await fetchJson(api('zenz', '/api/downloader/pinterestdl', { url: text }, 'apikey'))
                hisoka.sendMessage(m.chat, { video: { url: anu.result }, caption: `Download From ${text}` }, { quoted: m })
            }
            break
            case 'public': {
                if (!isCreator && !m.key.fromMe) throw mess.owner
                hisoka.public = true
                m.reply('Sukse Change To Public Usage')
            }
            break
            case 'self': {
                if (!isCreator && !m.key.fromMe) throw mess.owner
                hisoka.public = false
                m.reply('Sukses Change To Self Usage')
            }
            break
            case 'ping': case 'botstatus': case 'statusbot': {
                let timestamp = speed()
                let latensi = speed() - timestamp
                neww = performance.now()
                oldd = performance.now()
                respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
                `.trim()
                m.reply(respon)
            }
            break
            case 'owner': case 'creator': {
                let vcard = `BEGIN:VCARD\n` // metadata of the contact card
                    + `VERSION:3.0\n`
                    + `N:;${ownername}.;;;`
                    + `FN:${ownername}.\n` // full name
                    + `ORG:${ownername};\n` // the organization of the contact
                    + `TEL;type=CELL;type=VOICE;waid=${ownerNumber}:${ownerNumber}\n` // WhatsApp ID + phone number
                    + `END:VCARD`
               let msg = await hisoka.sendMessage(m.chat, { contacts: { displayName: `${ownername}`, contacts: [{ vcard }] } }, { quoted: m })
         let buttons3 = [
                    {buttonId: `menu`, buttonText: {displayText: '►BACK MENU '}, type: 1},
                ]
                let buttonMessage3 = {
                    text: `DONT NOT SPAM OWNER!! `,
                    footerText: 'Press The Button Below',
                    buttons: buttons3,
                    headerType: 2
                }
                 hisoka.sendMessage(m.chat, buttonMessage3, { quoted: msg })                        
               }
            break
            case 'eval': {
                if (!isCreator && !m.key.fromMe) return m.reply(mess.owner)
                function Return(sul) {
                    sat = JSON.stringify(sul, null, 2)
                    bang = util.format(sat)
                        if (sat == undefined) {
                            bang = util.format(sul)
                        }
                        return m.reply(bang)
                }
                try {
                    m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                } catch (e) {
                    m.reply(String(e))
                }
            }
            break
            case 'bot': {
                m.reply(mess.wait)
                let buttons = [
                    {buttonId: 'ping', buttonText: {displayText: 'Status Bot'}, type: 1}
                ]
                let buttonMessage = {
                    image: {url: 'https://telegra.ph/file/bb15c9a53c4a0b68a99fa.jpg' },
                    caption: `Hello @${m.sender.split("@")[0]}`,
                    footerText: 'Hi Im BLACKHAT Bot',
                    buttons: buttons,
                    headerType: 4
                }
                hisoka.sendMessage(m.chat, buttonMessage, { quoted: m})
            }
            break
           /* case 'tes': case 'menu': case 'help': case '?': {
                anu = `
⭓ *Group Menu*

${simbol} ${prefix}linkgroup
${simbol} ${prefix}ephemeral [option]
${simbol} ${prefix}setpp
${simbol} ${prefix}setname [text]
${simbol} ${prefix}group [option]
${simbol} ${prefix}add @user
${simbol} ${prefix}kick @user
${simbol} ${prefix}revoke [reset link]
${simbol} ${prefix}promote @user
${simbol} ${prefix}demote @user
${simbol} ${prefix}tagall

⭓ *Downloader Menu*

${simbol} ${prefix}tiktoknowm [url]
${simbol} ${prefix}tiktokwm [url]
${simbol} ${prefix}tiktokmp3 [url]
${simbol} ${prefix}instagram [url]
${simbol} ${prefix}instagramstory @username
${simbol} ${prefix}twitter [url]
${simbol} ${prefix}twittermp3 [url]
${simbol} ${prefix}ytplay [url]
${simbol} ${prefix}ytmp3 [url]
${simbol} ${prefix}ytmp4 [url]
${simbol} ${prefix}facebook [url]
${simbol} ${prefix}pinterestdl [url]

⭓ *Search Menu*

${simbol} ${prefix}pinterest [query]
${simbol} ${prefix}wallpaper [query]
${simbol} ${prefix}wikimedia [query]
${simbol} ${prefix}ytsearch [query]
${simbol} ${prefix}anime [query]

⭓ *Random Menu*

${simbol} ${prefix}porno
${simbol} ${prefix}hentai
${simbol} ${prefix}quotesanime
${simbol} ${prefix}motivasi
${simbol} ${prefix}dilanquote
${simbol} ${prefix}bucinquote
${simbol} ${prefix}katasenja
${simbol} ${prefix}puisi

⭓ *Convert Menu*

${simbol} ${prefix}toimage
${simbol} ${prefix}sticker
${simbol} ${prefix}tovideo
${simbol} ${prefix}togif
${simbol} ${prefix}tourl

⭓ *Main Menu*

${simbol} ${prefix}ping
${simbol} ${prefix}owner
${simbol} ${prefix}menu / ${prefix}help / ${prefix}?
${simbol} ${prefix}delete

⭓ *Owner Menu*

${simbol} ${prefix}chat [option]
${simbol} ${prefix}join [link]
${simbol} ${prefix}leave
${simbol} ${prefix}block @user
${simbol} ${prefix}unblock @user

*_Thanks To_*:
_Dika Ardnt_ (base)
_Zeoone_ 
_Rasyhid_
_Xfar_
`
                let message = await prepareWAMessageMedia({ image: fs.readFileSync('./lib/hisoka.jpg') }, { upload: hisoka.waUploadToServer })
                const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    templateMessage: {
                        hydratedTemplate: {
                            locationMessage: { 
                           degreesLatitude: 0,
						   degreesLongitude: 0, 
						   jpegThumbnail: fs.readFileSync('./lib/hisoka.jpg'),
						   },
                            hydratedContentText: anu,
                            hydratedFooterText: `Beta Version : 1.1.0`,
                            hydratedButtons: [{
                                urlButton: {
                                    displayText: 'Source Code',
                                    url: 'https://github.com/koleksibot'
                                }
                            }, {
                                callButton: {
                                    displayText: 'Number Phone Owner',
                                    phoneNumber: '+62 895-3693-18181'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Status Bot',
                                    id: 'ping'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Contact Owner',
                                    id: 'owner'
                                }  
                            }, {
                                quickReplyButton: {
                                    displayText: 'Script',
                                    id: 'sc'
                                }
                            }]
                        }
                    }
                }), { userJid: m.chat, quoted: m })
                hisoka.relayMessage(m.chat, template.message, { messageId: template.key.id })
            }
            break*/
case 'tes': case 'menu': case 'help': case '?': {
                anu = `
⭓ *Group Menu*

${simbol} ${prefix}linkgroup
${simbol} ${prefix}ephemeral [option]
${simbol} ${prefix}setpp
${simbol} ${prefix}setname [text]
${simbol} ${prefix}group [option]
${simbol} ${prefix}add @user
${simbol} ${prefix}kick @user
${simbol} ${prefix}revoke [reset link]
${simbol} ${prefix}promote @user
${simbol} ${prefix}demote @user
${simbol} ${prefix}tagall 
${simbol} ${prefix}hidetag [text]

⭓ *Downloader Menu*

${simbol} ${prefix}tiktoknowm [url]
${simbol} ${prefix}tiktokwm [url]
${simbol} ${prefix}tiktokmp3 [url]
${simbol} ${prefix}instagram [url]
${simbol} ${prefix}instagramstory @username
${simbol} ${prefix}twitter [url]
${simbol} ${prefix}twittermp3 [url]
${simbol} ${prefix}ytplay [url]
${simbol} ${prefix}ytmp3 [url]
${simbol} ${prefix}ytmp4 [url]
${simbol} ${prefix}facebook [url]
${simbol} ${prefix}pinterestdl [url]

⭓ *Search Menu*

${simbol} ${prefix}pinterest [query]
${simbol} ${prefix}wallpaper [query]
${simbol} ${prefix}wikimedia [query]
${simbol} ${prefix}ytsearch [query]
${simbol} ${prefix}anime [query]

⭓ *Random Menu*

${simbol} ${prefix}porno
${simbol} ${prefix}hentai
${simbol} ${prefix}quotesanime
${simbol} ${prefix}motivasi
${simbol} ${prefix}dilanquote
${simbol} ${prefix}bucinquote
${simbol} ${prefix}katasenja
${simbol} ${prefix}puisi

⭓ *Convert Menu*

${simbol} ${prefix}toimage
${simbol} ${prefix}sticker
${simbol} ${prefix}tovideo
${simbol} ${prefix}togif
${simbol} ${prefix}tourl

⭓ *Main Menu*

${simbol} ${prefix}ping
${simbol} ${prefix}owner
${simbol} ${prefix}menu / ${prefix}help / ${prefix}?
${simbol} ${prefix}delete

⭓ *Owner Menu*

${simbol} ${prefix}chat [option]
${simbol} ${prefix}join [link]
${simbol} ${prefix}leave
${simbol} ${prefix}block @user
${simbol} ${prefix}unblock @user

*_Thanks To_*:
_Dika Ardnt_ (base)
_Zeoone_ 
_Rasyhid_
_Xfar_
`
                let message = await prepareWAMessageMedia({ video: fs.readFileSync('./lib/menu.mp4'), gifPlayback: true}, { upload: hisoka.waUploadToServer })
                const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    templateMessage: {
                        hydratedTemplate: {
                            videoMessage: message.videoMessage,
                            hydratedContentText: anu,
                            hydratedButtons: [{
                                urlButton: {
                                    displayText: 'Github',
                                    url: 'https://github.com/koleksibot'
                                }
                            }, {
                                callButton: {
                                    displayText: 'Number Owner',
                                    phoneNumber: '+62 895-3693-18181'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Status',
                                    id: 'ping'
                                }
                            }, {
                                quickReplyButton: {
                                    displayText: 'Contact Owner',
                                    id: 'owner'
                                }  
                            }, {
                                quickReplyButton: {
                                    displayText: 'Script',
                                    id: '#sc'
                                }
                            }]
                        }
                    }
                }), { userJid: m.chat, quoted: m })
                hisoka.relayMessage(m.chat, template.message, { messageId: template.key.id })
            }
            break

    
            default:
                if (budy.startsWith('=>')) {
                    if (!isCreator && !m.key.fromMe) return m.reply(mess.owner)
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                            if (sat == undefined) {
                                bang = util.format(sul)
                            }
                            return m.reply(bang)
                    }
                    try {
                        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        m.reply(String(e))
                    }
                }

                if (budy.startsWith('>')) {
                    if (!isCreator && !m.key.fromMe) return m.reply(mess.owner)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await m.reply(evaled)
                    } catch (err) {
                        m = String(err)
                        await m.reply(m)
                    }
                }

                if (budy.startsWith('$')) {
                    if (!isCreator && !m.key.fromMe) return reply(mess.owner)
                    exec(budy.slice(2), (err, stdout) => {
                        if(err) return m.reply(err)
                        if (stdout) return m.reply(stdout)
                    })
                }
        }
        

    } catch (err) {
        m.reply(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
