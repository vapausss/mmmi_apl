# Ein paar Hinweise

https://www.startasl.com/basic-words-in-sign-language/  
hiervon können wir die wörter nehmen, die wir alss wichtig empfinden   
(ich hab mir das video hier (ASL 1 Vocabulary - First Signs | Start ASL) angeguckt und alle wörter daraus genommen   
https://www.youtube.com/watch?time_continue=102&v=wltHj_ggxE4&embeds_referring_euri=https%3A%2F%2Fwww.startasl.com%2F&source_ve_path=Mjg2NjY )   

 
das scheint auch eine hilfsreiche website zu sein, ich hätte gedacht, dass wir die eventuell auch als unsere quelldaten einbinden   
https://dai.cs.rutgers.edu/dai/s/signbank   

# Teachable Machine

ihr geht auf den link   
https://teachablemachine.withgoogle.com/train  
und wählt open from file  
der file ist hier hochgeladen und heißt asl_model.tm   
dann könnt ihr zu beliebigen wörtern eure beiträge leisten oder neue wörter (classes) einbinden  
dann müsst ihr die maschine trainieren und bei den advanced einstellungen die learning rate auf 0.00101 stellen (hatte bessere ergebnisse bei mir)  
wenn ihr das exportieren wollt dann wählt ihr tensorflow.js und download.  
**um aber die neue .tm datei zu erhalten damit wir alle weiterhin damit arbeiten können** müsst ihr das projekt nochmal als file runterladen, ihr müsstet irgendwo ein dropdown menü sehen wo diese option ist.   
dann habt ihr die .tm datei und könnt die hier pushen ^^  (bennent sie gerne um damit sie nicht project.tm heißt und ihr nicht durcheinanderkommt)

p.s.: sorry für die nicht vorhandene großschreibung :)
